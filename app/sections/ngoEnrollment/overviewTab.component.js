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
	  vm.view.promoters=" ";
	  }
	} 	 	
  vm.delRow = function(index){  
	 vm.list.splice(index, 1);
	} 	 	
  
  vm.view = ngoEnrollmentService.overviewData;
   
  vm.save =  function(){
	  var data = {
	  "name": vm.view.name,
	  "phone": vm.view.phone, 
	  "website": vm.view.website,
	  "contact":vm.view.contact,
	  "employees":vm.view.employees,
	  "overview":vm.view.overview,
	  "mission":vm.view.mission,
	  "promoters":vm.list
	  };
		
	  	if(vm.view.name!=null && vm.view.phone!=null && vm.view.website!=null && vm.view.contact !=null && vm.view.employees !=null && vm.view.overview !=null && vm.view.mission !=null){
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
        