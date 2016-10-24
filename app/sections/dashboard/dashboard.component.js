(function() {
    angular
        .module('app')
        .component('dashboard', {
            bindings: {},
            template: `<top-nav></top-nav>
                        <div id="dashboard-section">
                            <actions-section></actions-section>
                            <organization-section></organization-section>
                        </div>`
        });
})();