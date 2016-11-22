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

    OrderDetailController.$inject = ['$mdDialog', '$state', '$window', '$q', 'selectedNavItemService', 'ordersService'];

    function OrderDetailController($mdDialog, $state, $window, $q, selectedNavItemService, ordersService) {
        let vm = this;

        vm.currentStep = 1;
        vm.mealAmount = null;
        vm.needMoreFunds = false;
        vm.canCompleteDisabled = true;
        vm.canContinueDisabled = true;
        vm.orderInfo = {};
        vm.orderShown = false;
        vm.loadingOrderShown = false;

        vm.$onInit = function () {
            selectedNavItemService.setSelectedItem("orders");
            ordersService.getInitialOrder(getInitialSuccess);

            vm.user = {
                name: "Veronica Bagwell",
                phone: "(479) 313-5606",
                email: "veronica.bagwell@walmart.com",
                organization: "7 Hills Homeless Center"
            };

            vm.paymentInfo = [
                {
                    code: "1234 4567 9874 5489",
                    amount: "2.75",
                    amountUsed: null
                },
                {
                    code: "1234 4567 9874 5489",
                    amount: "2.75",
                    amountUsed: null
                }
            ]
        };

        vm.placeOrder = function() {
            vm.currentStep++;
            $window.open(vm.orderInfo.website, '_blank');
        };

        vm.continueOrder = function() {
            return ordersService.getPaymentDetails(vm.orderInfo.providerId, vm.mealAmount);
        };

        vm.continueComplete = function() {
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
            return $q.all([ordersService.getOrderCount()]);
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

        function getInitialSuccess(data) {
            console.log(data);
            vm.orderInfo.id = data.id;
            vm.orderInfo.totalCost = data.total;
            vm.orderInfo.providerId = data.providerLocation.provider.id;
            vm.orderInfo.providerName = data.providerLocation.provider.name;
            vm.orderInfo.providerAddress = data.providerLocation.address.address1;
            vm.orderInfo.providerCity = capitalizeFirstLetter(data.providerLocation.address.city);
            vm.orderInfo.providerState = data.providerLocation.address.state.toUpperCase();
            //vm.orderInfo.orderItem = data.orderItems[0].menuItem.name;
            vm.orderInfo.orderTime = formatTime(data.orderDate);

            vm.orderInfo.foodItem = "Turkey Sandwich";
            vm.orderInfo.website = "http://www.subway.com";

            vm.orderShown = true;
        }

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