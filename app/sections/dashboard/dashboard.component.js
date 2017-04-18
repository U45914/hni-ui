(function() {
    angular
        .module('app')
        .component('dashboard', {
            bindings: {},
            template: `<top-nav></top-nav>
                        <div id="dashboard-section">
                            <actions-section></actions-section>
                                   </div><div><user-list></user-list></div>`
        });
})();