(function () {
  angular
      .module('app')
      
      .directive('overviewTab', overviewDirective)
	
	
	function overviewDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "overviewTab.tpl.html",
			controller : overviewController,
			controllerAs: 'vm'
		}

	} 
  
  overviewController.$inject = ['$q','ngoEnrollmentService','$rootScope', 'toaster']; 
  
  function overviewController ($q,ngoEnrollmentService,$rootScope, toaster) {
	  var vm = this;
	  vm.list= [];
	  
 
  vm.addRow = function(promoters){  
	 var newPromoter = document.getElementById('promoters');
	  vm.list.push(promoters);
	  vm.flag=true;
	} 	 	
  vm.delRow = function(index){  
	 vm.list.splice(index, 1);
	} 	 	
  
 
  vm.save =  function(){
	  var data = {
	  "ngoName": vm.name,
	  "ngoPhone": vm.phone, 
	  "ngoWebsite": vm.website,
	  "ngoContact":vm.contact,
	  "ngoOverview":vm.overview,
	  "ngoMission":vm.mission,
	  "ngoPromoters":vm.list,
	  };
		
	  	if(vm.name!=null && vm.phone!=null && vm.website!=null && vm.contact !=null && vm.overview !=null && vm.mission !=null){
			 //var serviceCalls = ngoEnrollmentService.postOverviewList(data);
			 //$q.all(serviceCalls)//.then(onSuccess,onError);
			 $rootScope.$broadcast("scroll-tab", [1,2]);
		   }
		 else{
			 toaster.success('Hello world!', 'Toastr fun!');
			 return false;
		}
  }
  
	  function onSuccess(response){
		  
	  }
	  
	  function onError(response){
		  console.log(response)
	  }
   
    
 }
 })();
        