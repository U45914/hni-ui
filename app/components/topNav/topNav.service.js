(function() {
    angular
        .module('app')
        .factory('topNavService', topNavService);

    function topNavService() {
        let selectedItem = {
            item: ""
        };

        return {
            getSelectedItem: getSelectedItem,
            setSelectedItem: setSelectedItem
        };

        function getSelectedItem() {
            return selectedItem;
        }

        function setSelectedItem(item) {
            selectedItem.item = item;
        }
    }
})();