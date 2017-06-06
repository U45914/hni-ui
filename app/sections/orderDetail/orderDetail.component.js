(function () {
    angular
        .module('app')
        .component('orderDetail', {
            bindings: {},
            templateUrl: 'order-detail.tpl.html',
            controller: OrderDetailController,
            controllerAs: 'vm'
        });

    OrderDetailController.$inject = ['$element', '$document', '$window','$scope', '$q', '$interval',
        '$timeout', 'ordersService', 'timeoutService', 'selectedNavItemService', '$mdDialog'];

    function OrderDetailController($element, $document, $window, $scope, $q, $interval,
                                   $timeout, ordersService, timeoutService, selectedNavItemService, $mdDialog) {
        let vm = this;

        let lockGetInitialOrder = false;
        let initialOrderInterval = null;
        let previousProviderId = null;
        let orderDetailContainer = $element[0].querySelector('#order-detail-container');
        let footer = $element[0].getElementsByClassName('order-detail-footer')[0];
        let topNav = $document[0].getElementById('top-nav');

        vm.orderInfo = {};
        vm.paymentInfo = {};
        vm.showPaymentInfo = true;
        vm.orderShown = false;
        vm.loadingOrderShown = false;

        vm.placeOrder = placeOrder;
        vm.getMoreFunds = getMoreFunds;
        vm.completeOrder = completeOrder;
        vm.showComplete = showComplete;

        vm.$onInit = function() {
            selectedNavItemService.setSelectedItem("orders");
            ordersService.getInitialOrder(getInitialSuccess);

            $document.ready(() => {
                setContainerHeight();
            });

            //Cancels timeouts and intervals on leaving scope.
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

            angular.element($window).on('resize', ()=> {
                setContainerHeight();
            });
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

                if(previousProviderId !== vm.orderInfo.providerId) {
                    ordersService.getPaymentDetails(vm.orderInfo.orderId)
                        .then((response) => {
                            setPaymentInfo(response.data);
                        });
                }

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

        function placeOrder() {
            $window.open(vm.orderInfo.providerWebsite, '_blank');
        }

        function setPaymentInfo(data) {
            if(Object.keys(data).length !== 0) {
                vm.paymentInfo.orderId = vm.orderInfo.orderId;
                vm.paymentInfo.paymentInstrumentId = data.id.paymentInstrument.id;
                vm.paymentInfo.cardNumber = data.id.paymentInstrument.cardNumber;
                vm.paymentInfo.pinNumber = data.id.paymentInstrument.pinNumber;
            }
        }

        function getMoreFunds() {
            vm.showPaymentInfo = false;

            ordersService.getPaymentDetails(vm.orderInfo.orderId)
                .then((response) => {
                    setPaymentInfo(response.data);
                    vm.showPaymentInfo = true;
                });
        }

        function completeOrder() {
            return $q.all([ordersService.getOrderCount(), ordersService.completeOrder(vm.orderInfo.orderId)]);
        }

        function showComplete(response) {
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
        }

        function resetLocalData() {
            lockGetInitialOrder = false;
            initialOrderInterval = null;
            previousProviderId = vm.orderInfo.providerId;

            vm.orderShown = false;
            vm.loadingOrderShown = false;
            vm.orderInfo = {};
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

        function setContainerHeight() {
            try {
                let footerHeight = footer.offsetHeight;
                let topNavHeight = topNav.offsetHeight;

                orderDetailContainer.style.height = `calc(100vh - ${footerHeight}px - ${topNavHeight}px)`;
            } catch(error) {
                $timeout(() => {
                    setContainerHeight();
                });
            }
        }
    }
})();