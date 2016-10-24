(function() {
    angular
        .module("app")
        .filter('orgFilter', orgFilter);


    function orgFilter(){
        return function (items, searchText) {
            var filtered = [];

            angular.forEach(items, function(item){
                if(item.name != null && item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                    filtered.push(item);
                }
            });
            return filtered;
        };
    }
})();