(function () {
    angular
        .module('app')
        .component('orderFoodItem', {
            bindings: {
                number: '=',
                text: '=',
                description: '='
            },
            template: `<div class="order-detail-food-info">
                            <div class="order-detail-food-quantity">{{$ctrl.number}}</div>
                            <div class="order-detail-food-text">
                                <div class="order-detail-food-name">{{$ctrl.text}}</div>
                                <div class="order-detail-food-description">{{$ctrl.description}}</div>
                            </div>
                        </div>`
        });
})();