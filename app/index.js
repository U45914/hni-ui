/*
 App entry file
 */

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () {
        window.location.reload();
    });
}

/*App module files*/
require('./app.module');

/*App component files*/
requireAll(require.context('./', false, /\.js$/), ['./app.module.js', './index.js']);
requireAll(require.context('./services', true, /\.js$/));
requireAll(require.context('./directives', true, /\.js$/));
requireAll(require.context('./components', true, /\.js$/));
requireAll(require.context('./sections', true, /\.js$/));

//Iterates through every file at the context passed in, except for the values passed in (to allow loading modules first).
function requireAll(items, excludes) {
    items.keys().forEach(function(key) {
        if(excludes == null) {
            items(key);
        }
        else if(excludes.indexOf(key) == -1) {
            items(key);
        }
    });
}
