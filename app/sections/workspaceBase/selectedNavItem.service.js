(function() {
    angular
        .module('app')
        .factory('selectedNavItemService', selectedNavItemService);

    function selectedNavItemService() {
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