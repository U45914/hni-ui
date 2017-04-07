(function () {
  angular
      .module('app')
      
      .directive('overviewTab', overviewDirective)
	
	
	function overviewDirective() {
		return {
			scope : {
				//memberList : "=list"
			},
			restrict : "E",
			templateUrl : "overviewTab.tpl.html",
			controller : overviewController,
			 controllerAs: 'vm'
		}

	} 
  
  overviewController.$inject = ['$q','ngoEnrollmentService']; 
  
  function overviewController ($q,ngoEnrollmentService) {
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
  
  vm.overviewNext =  function(){
	  /*var data = [vm.name,vm.phone,vm.website,vm.contact,vm.overview,vm.mission ];
		 if(vm.name!=null && vm.phone!=null && vm.website!=null && vm.contact !=null && vm.overview !=null && vm.mission !=null){
			 var serviceCalls = ngoEnrollment.enrollNgo(data);
			 return $q.all(serviceCalls);
		   }*/
	  alert("Next Function");
	  vm.firstTab=false;
	  vm.secondTab=true;
		 
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
			 var serviceCalls = ngoEnrollmentService.overviewList(data);
			 console.log(data);
			 return $q.all(serviceCalls);
		   }
		 else{
			 window.alert("Please fill Fields");
			// document.getElementById('name').style.borderColor = "red";
		        return false;
			 
		 }
  }
  
  vm.overviewNext =  function(){
	  /*var data = [vm.name,vm.phone,vm.website,vm.contact,vm.overview,vm.mission ];
		 if(vm.name!=null && vm.phone!=null && vm.website!=null && vm.contact !=null && vm.overview !=null && vm.mission !=null){
			 var serviceCalls = ngoEnrollment.enrollNgo(data);
			 return $q.all(serviceCalls);
		   }*/
	  alert("Next Function");
	  vm.firstTab=false;
	  vm.secondTab=true;
		 
  }
  
  }
  })();
        