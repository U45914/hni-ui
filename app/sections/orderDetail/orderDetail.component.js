(function() {
    angular
        .module('app')
        .component('orderDetail', {
            bindings: {

            },
            templateUrl: 'order-detail.tpl.html',
            controller: OrderDetailController,
            controllerAs: 'vm'
        });

    function OrderDetailController() {
        var vm = this;

        vm.$onInit = function() {
            vm.user = {
                name: "Veronica Bagwell",
                phone: "(479) 313-5606"
            };

            vm.orderInfo = {
                name: "Subway",
                foodItems: ["Turkey Sandwich", "Turkey Sandwich"],
                time: "12:30pm",
                address: "2301 W Walnut St",
                phone: "(479) 636-6699",
                website: "http://www.subway.com/en-us"
            }
        };
    }
})();