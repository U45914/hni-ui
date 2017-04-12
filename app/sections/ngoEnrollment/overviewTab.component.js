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
  
  overviewController.$inject = ['$q','ngoEnrollmentService','$rootScope']; 
  
  function overviewController ($q,ngoEnrollmentService,$rootScope) {
	  var vm = this;
	  vm.list= [];
	  
	 
  vm.addRow = function(promoters){ 
	  if(promoters != null){
	  vm.list.push(promoters);
	  vm.flag=true;
	  vm.promoter=" ";
	  }
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
	  "ngoPromoters":vm.list
	  };
		
	  	if(vm.name!=null && vm.phone!=null && vm.website!=null && vm.contact !=null && vm.overview !=null && vm.mission !=null){
	  		ngoEnrollmentService.overviewData = data; 
	  		//var serviceCalls = ngoEnrollmentService.postOverviewList(data);
	  		//$q.all(serviceCalls)//.then(onSuccess,onError);
			 $rootScope.$broadcast("scroll-tab", [1,2]);
		   }
		 else{
			 //toaster.success('Hello world!', 'Toastr fun!');
			 window.alert("Please fill the fields");
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
        