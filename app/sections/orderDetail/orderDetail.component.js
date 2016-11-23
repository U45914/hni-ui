(function () {
    angular
        .module('app')
        .component('orderDetail', {
            bindings: {

            },
            templateUrl: 'order-detail.tpl.html',
            controller: OrderDetailController,
            controllerAs: 'vm'
        });

    OrderDetailController.$inject = ['$scope', '$mdDialog', '$state', '$interval', '$window', '$q', 'selectedNavItemService', 'authService', 'ordersService', 'timeoutService', 'serviceConstants'];

    function OrderDetailController($scope, $mdDialog, $state, $interval, $window, $q, selectedNavItemService, authService, ordersService, timeoutService, serviceConstants) {
        let vm = this;

        let lockGetInitialOrder = false;
        let initialOrderInterval = null;

        vm.currentStep = 1;
        vm.mealAmount = null;
        vm.needMoreFunds = false;
        vm.canCompleteDisabled = true;
        vm.canContinueDisabled = true;
        vm.orderShown = false;
        vm.loadingOrderShown = false;
        vm.orderInfo = {};
        vm.paymentInfo = [];

        vm.$onInit = function () {
            selectedNavItemService.setSelectedItem("orders");
            ordersService.getInitialOrder(getInitialSuccess);

            //Unlocks order on leaving scope.
            $scope.$on('$destroy', () => {
                $interval.cancel(initialOrderInterval);
                timeoutService.cancelTimeout();
            });

            //Unlocks order on state change.
            $scope.$on('$stateChangeStart', () => {
                if(vm.orderInfo.orderId) {
                    ordersService.unlockOrder(vm.orderInfo.orderId);
                }

                $window.onbeforeunload = undefined;
            });

            //Unlocks order on refresh/browser close/tab close
            $window.onbeforeunload = function() {
                if(vm.orderInfo.orderId) {
                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.open("DELETE", `${serviceConstants.baseUrl}/orders/lock/${vm.orderInfo.orderId}`, false);
                    xmlhttp.setRequestHeader("Content-type", "application/json");
                    xmlhttp.setRequestHeader("X-hni-token", authService.getToken());
                    xmlhttp.send();
                }

                return null;
            };
        };

        vm.placeOrder = function() {
            vm.currentStep++;
            $window.open(vm.orderInfo.providerWebsite, '_blank');
        };

        vm.continueOrder = function() {
            return ordersService.getPaymentDetails(vm.orderInfo.orderId, vm.orderInfo.providerId, vm.mealAmount);
        };

        vm.continueComplete = function(response) {
            angular.forEach(response.data, (data) => {
                vm.paymentInfo.push(
                    {
                        orderId: vm.orderInfo.orderId,
                        amount: data.amount,
                        paymentInstrumentId: data.id.paymentInstrument.id,
                        cardNumber: data.id.paymentInstrument.cardNumber,
                        pinNumber: data.id.paymentInstrument.pinNumber,
                        amountUsed: null
                    }
                )
            });

            vm.currentStep++;
        };

        vm.leaveOrders = function() {
            $state.go('dashboard');
        };

        vm.amountUsedChanged = function(item) {
            vm.needMoreFunds = false;
            vm.canCompleteDisabled = false;

            if(item.amountUsed != null && item.amount !== removeDollar(item.amountUsed)) {
                vm.needMoreFunds = true;
            }

            if(removeDollar(item.amountUsed) > item.amount) {
                item.amountUsed = 0;
            }

            angular.forEach(vm.paymentInfo, (info) => {
                if(info.amountUsed == null) {
                    vm.canCompleteDisabled = true;
                }
            });
        };

        vm.getMoreFunds = function() {
            vm.canCompleteDisabled = true;
            vm.needMoreFunds = false;

            vm.paymentInfo.push(
                {
                    code: "1234 4567 9874 5489",
                    amount: "2.75",
                    amountUsed: null
                }
            )
        };

        vm.totalAmountChanged = function() {
            vm.mealAmount = removeDollar(vm.mealAmount);

            vm.canContinueDisabled = !(vm.mealAmount > 0);
        };

        vm.completeOrder = function () {
            let data = angular.copy(vm.paymentInfo);

            angular.forEach(data, (item) => {
                delete item['amount'];
                delete item['cardNumber'];
                delete item['pinNumber'];
                item.amountUsed = Number(removeDollar(item.amountUsed));
            });

            return $q.all([ordersService.getOrderCount(), ordersService.completeOrder(data)]);
        };

        vm.showComplete = function(response) {
            $mdDialog.show({
                controller: 'CompleteOrderController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'order-complete.tpl.html',
                locals : {
                    orderCount: response[0].data['order-count']
                }
            });
        };

        //Sets data from first get orders call. If no data, sets interval to call the function until data exists.
        function getInitialSuccess(response) {
            let data = response.data;

            if(data != '') {
                vm.orderInfo.orderId = data.id;
                vm.orderInfo.totalCost = data.total;
                vm.orderInfo.userName = `${data.user.firstName} ${data.user.lastName.charAt(0).toUpperCase()}.`;
                vm.orderInfo.providerId = data.providerLocation.provider.id;
                vm.orderInfo.providerName = data.providerLocation.provider.name;
                vm.orderInfo.providerAddress = data.providerLocation.address.address1;
                vm.orderInfo.providerCity = capitalizeFirstLetter(data.providerLocation.address.city);
                vm.orderInfo.providerWebsite = data.providerLocation.provider.websiteUrl;
                vm.orderInfo.providerState = data.providerLocation.address.state.toUpperCase();
                //vm.orderInfo.orderItem = data.orderItems[0].menuItem.name;
                vm.orderInfo.orderTime = formatTime(data.orderDate);

                vm.orderInfo.foodItem = "Turkey Sandwich";

                lockGetInitialOrder = false;
                vm.orderShown = true;
                vm.loadingOrderShown = false;

                $interval.cancel(initialOrderInterval);
                timeoutService.startTimeout();
            }
            else if(!lockGetInitialOrder) {
                lockGetInitialOrder = true;
                vm.orderShown = false;
                vm.loadingOrderShown = true;

                initialOrderInterval = $interval(() => {
                    ordersService.getInitialOrder(getInitialSuccess);
                }, 15000)
            }
        }

        //formats epoch time to hours + minutes
        function formatTime(value) {
            let date = new Date(value);
            let time = (`${date.getHours()}:${date.getMinutes()}`).split(':');

            let hours = Number(time[0]);
            let minutes = Number(time[1]);

            let timeValue = "" + ((hours >12) ? hours - 12 : hours);
            timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;

            timeValue += (hours >= 12) ? 'pm' : "am";

            return timeValue;
        }

        function capitalizeFirstLetter(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }

        function removeDollar(value) {
            return value.replace('$', '');
        }
    }
})();