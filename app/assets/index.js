if (module.hot) {
    module.hot.accept()
}


/*App css files*/
requireAll(require.context('./scss', true, /\.scss$/));


//Iterates through every file at the context passed in, except for the values passed in.
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
