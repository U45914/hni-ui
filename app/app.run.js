(function() {
    angular
        .module('app')
        .run(runblock);

    runblock.$inject = ['$templateCache'];

    function runblock($templateCache) {
        requireAll(require.context('./views', true, /\.html/), ['./index.html']);

        //Iterates through every file at the context passed in, except for the exclude values passed in.
        function requireAll(items, excludes) {
            items.keys().forEach(function(key) {
                if(excludes == null) {
                    $templateCache.put(key.slice(2), require('./views/' + key.slice(2)));
                }
                else if(excludes.indexOf(key) == -1) {
                    $templateCache.put(key.slice(2), require('./views/' + key.slice(2)));
                }
            });
        }
    }
})();