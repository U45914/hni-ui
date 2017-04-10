(function() {
	angular
	 .module('app')
     .component('stakeholdersTab', {
     	bindings: {

         },
         templateUrl: 'stakeholdersTab.tpl.html',
         controller: StakeHolderTabController,
         controllerAs: 'shtc'
     });
	
	
	StakeHolderTabController.$inject = ['$q','ngoEnrollmentService','$scope'];
	
	function StakeHolderTabController($q,ngoEnrollmentService ,$scope){
		var shtc = this;
		shtc.boardMainList = [];
		shtc.brandPartnersList = [];
		shtc.localPartnersList= [];
		
		
		shtc.save = function(){
			var data = { 
					"boardMembers" :  shtc.boardMainList,
					"brandPartners " : shtc.brandPartnersList,
					"localPartners ": shtc.localPartnersList
			};
   		 	console.log(data);
  	   		var serviceCalls = ngoEnrollmentService.postStakeholdersList(data);
  	   		return $q.all(serviceCalls);
		}
	}

})();