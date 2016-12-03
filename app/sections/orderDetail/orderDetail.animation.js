(function() {
    angular
        .module('app')
        .animation('.order-detail-animation', orderDetailAnimation);

    orderDetailAnimation.$inject = ['$animateCss'];

    function orderDetailAnimation($animateCss) {
        return {
            enter : function(element, done) {
                let animation = '';

                animation = $animateCss(element, {
                    addClass: 'order-detail-enter-animation',
                    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                    cleanupStyles: true
                });

                return animation;
            },
            leave : function(element, done) {
                let animation = '';
                let height = element[0].offsetHeight / 16;

                animation = $animateCss(element, {
                    addClass: 'order-detail-leave-animation',
                    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
                    from: { height: `${height}rem`},
                    to: { height: `0` },
                    duration: 0.6,
                    cleanupStyles: true
                });

                return animation;
            }
        };
    }
})();