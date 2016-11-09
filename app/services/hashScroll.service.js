(function() {
    angular
        .module('app')
        .factory('hashScroll', hashScroll);

    hashScroll.$inject = ['$location', '$anchorScroll'];

    function hashScroll($location, $anchorScroll) {

        return {
            scrollToHash: scrollToHash
        };

        function scrollToHash(hash) {
            $anchorScroll(hash);
        }
    }
})();