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

    OrderDetailController.$inject = ['$scope', '$mdDialog', '$state', '$interval', '$window', '$q', 'authService', 'selectedNavItemService', 'ordersService', 'timeoutService'];

    function OrderDetailController($scope, $mdDialog, $state, $interval, $window, $q, authService, selectedNavItemService, ordersService, timeoutService) {
        let vm = this;

        let lockGetInitialOrder = false;
        let initialOrderInterval = null;

        vm.currentStep = 1;
        vm.moreFundsCalled = 0;
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

            //Unlocks order on refresh/browser close/tab close. Needs xmlhttp call to force the call to be synchronous.
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

        vm.incrementStep = function() {
            vm.currentStep++;
        };

        vm.continueOrder = function() {
            if(vm.mealAmount > (vm.orderInfo.totalCost + (vm.orderInfo.totalCost * 0.25))) {
                authService.logout();
            }
            else {
                return ordersService.getPaymentDetails(vm.orderInfo.orderId, vm.orderInfo.providerId, vm.mealAmount);
            }
        };

        vm.continueComplete = function(response) {
            setPaymentInfo(response.data);

            vm.currentStep++;
        };

        vm.leaveOrders = function() {
            $state.go('volunteer-landing');
        };

        vm.amountUsedChanged = function(item) {
            vm.canCompleteDisabled = false;
            vm.needMoreFunds = false;
            item.amountUsed = Number(item.amountUsed);

            if(item.amountUsed !== null && item.amount !== item.amountUsed) {
                item.error = true;
                vm.needMoreFunds = true;

                if(item.amount > item.amountUsed) {
                    vm.canCompleteDisabled = true;
                }
            }
            else {
                item.error = false;
            }

            angular.forEach(vm.paymentInfo, (info) => {
                if(info.amountUsed == null) {
                    vm.canCompleteDisabled = true;
                }
            });
        };

        vm.getMoreFunds = function() {
            let amountNeeded = 0;

            vm.needMoreFunds = false;
            vm.canCompleteDisabled = true;
            vm.moreFundsCalled += 1;

            angular.forEach(vm.paymentInfo, (item) => {
                if(item.error) {
                    amountNeeded += Math.abs(Math.round((item.amount - item.amountUsed) * 100 ) / 100);
                }

                item.error = false;
            });

            if(vm.moreFundsCalled < 3) {
                ordersService.getPaymentDetails(vm.orderInfo.orderId, vm.orderInfo.providerId, amountNeeded)
                    .then((response) => {
                        setPaymentInfo(response.data);
                    })
            }
            else {
                vm.canCompleteDisabled = false;
            }
        };

        vm.totalAmountChanged = function() {
            vm.canContinueDisabled = !(vm.mealAmount > 0);
        };

        vm.completeOrder = function () {
            let data = angular.copy(vm.paymentInfo);

            angular.forEach(data, (item) => {
                delete item['amount'];
                delete item['cardNumber'];
                delete item['pinNumber'];
                delete item['error'];
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
                    providerId: vm.orderInfo.providerId,
                    orderCount: response[0].data['order-count']
                }
            }).then((response) => { resetLocalData(); getInitialSuccess(response);});
        };

        //Sets data from first get orders call. If no data, sets interval to call the function until data exists.
        function getInitialSuccess(response) {
            if(response.status !== 204) {
                let data = response.data;

                vm.orderInfo.orderId = data.id;
                vm.orderInfo.totalCost = data.subTotal;
                vm.orderInfo.userName = `${data.user.firstName} ${data.user.lastName.charAt(0).toUpperCase()}.`;
                vm.orderInfo.providerId = data.providerLocation.provider.id;
                vm.orderInfo.providerName = data.providerLocation.provider.name;
                vm.orderInfo.providerAddress = data.providerLocation.address.address1;
                vm.orderInfo.providerCity = capitalizeFirstLetter(data.providerLocation.address.city);
                vm.orderInfo.providerWebsite = data.providerLocation.provider.websiteUrl;
                vm.orderInfo.providerState = data.providerLocation.address.state.toUpperCase();
                vm.orderInfo.orderItems = [];
                vm.orderInfo.orderTime = formatTime(data.orderDate);

                angular.forEach(data.orderItems, (item) => {
                    let index = vm.orderInfo.orderItems.map((orderItem) => {
                        if(item.menuItem) {
                            return item.menuItem.name;
                        }
                        else {
                            return null;
                        }
                    }).indexOf(item.menuItem.name);

                    if(index === -1) {
                        vm.orderInfo.orderItems.push({name: item.menuItem.name, description: item.menuItem.description,quantity: 1});
                    }
                    else {
                        vm.orderInfo.orderItems[index].quantity += 1;
                    }
                });

                lockGetInitialOrder = false;
                vm.orderShown = true;
                vm.loadingOrderShown = false;

                $interval.cancel(initialOrderInterval);
                timeoutService.startTimeout(900000);
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

        function setPaymentInfo(data) {
            angular.forEach(data, (item) => {
                vm.paymentInfo.push(
                    {
                        orderId: vm.orderInfo.orderId,
                        amount: (Math.round((item.amount) * 100 ) / 100),
                        paymentInstrumentId: item.id.paymentInstrument.id,
                        cardNumber: item.id.paymentInstrument.cardNumber,
                        pinNumber: item.id.paymentInstrument.pinNumber,
                        amountUsed: null,
                        error: false
                    }
                )
            });

            if(vm.paymentInfo.length < 1) {
                vm.canCompleteDisabled = false;
            }
        }

        function resetLocalData() {
            lockGetInitialOrder = false;
            initialOrderInterval = null;

            vm.currentStep = 1;
            vm.moreFundsCalled = 0;
            vm.mealAmount = null;
            vm.needMoreFunds = false;
            vm.canCompleteDisabled = true;
            vm.canContinueDisabled = true;
            vm.orderShown = false;
            vm.loadingOrderShown = false;
            vm.orderInfo = {};
            vm.paymentInfo = [];
        }
    }
})();