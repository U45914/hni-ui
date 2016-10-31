(function() {
    angular
        .module('app')
        .run(runblock);

    runblock.$inject = ['$templateCache', 'userService'];

    function runblock($templateCache, userService) {
        requireAllViews(require.context('./views', true, /\.html/), ['./index.html']);
        requireAllSections(require.context('./sections', true, /\.html/));

        userService.setUser();

        //Iterates through every file at the context passed in, except for the exclude values passed in, and pushes it onto template cache..
        function requireAllViews(items, excludes) {
            items.keys().forEach(function(key) {
                if(excludes == null) {
                    $templateCache.put(key.slice(2), require('./views/' + key.slice(2)));
                }
                else if(excludes.indexOf(key) == -1) {
                    $templateCache.put(key.slice(2), require('./views/' + key.slice(2)));
                }
            });
        }

        //Iterates through every file at the context passed in and pushes it onto template cache.
        function requireAllSections(items) {
            items.keys().forEach(function(key) {
                var index = key.slice(2).lastIndexOf('/');
                var templateName = key.slice(2).slice(index+1);

                $templateCache.put(templateName, require('./sections/' + key.slice(2)));
            });
        }
    }
})();