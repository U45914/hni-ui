(function () {
    angular
        .module('app')
        .component('orderDetailHeader', {
            bindings: {
                icon: '@',
                text: '@'
            },
            template: `<div class="order-detail-header">
                            <div class="material-icons">{{::$ctrl.icon}}</div>
                            <div>{{::$ctrl.text}}</div>
                        </div>`
        });
})();