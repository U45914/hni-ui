(function() {
    angular
        .module('app')
        .component('dashboard', {
            bindings: {},
            template: `
            
           
            <top-nav></top-nav>
            			<div layout="row" layout-align="space-around none">
            				<md-content flex="20" layout-padding class="md-whiteframe-4dp">
		            			<left-nav-bar></left-nav-bar>
		            		</md-content>
		            		<md-content flex="80" layout-padding class="md-whiteframe-4dp">
		                    	<actions-section></actions-section>
		                    	<div>
		                        	<user-list></user-list>
		                        </div>
		                     </md-content>
	                     </div>
	                     
	                     <landing-footer></landing-footer>
                        `
        });
})();