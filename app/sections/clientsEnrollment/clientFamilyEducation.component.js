(function() {
	angular
		.module('app')
		
		 .directive('clientFamilyEducation', clientFamilyEducationDirective)
	
	
	function clientFamilyEducationDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "clientFamilyEducation.tpl.html",
			controller : clientFamilyEducationController,
			 controllerAs: 'vm'
		}
	}
	
	clientFamilyEducationController.inject = ['$q','clientEnrollmentService','$scope','$rootScope','$state'];
	
	function clientFamilyEducationController($q,clientEnrollmentService,$scope,$rootScope,$state){
    	var vm = this;
    	//vm.family = clientEnrollmentService.clientEmployment;
    	 $scope.$on("data-loaded-client", function(obj) {
 			vm.load();
 	 });
 	  
 	  vm.load = function() {
 			vm.family = clientEnrollmentService.finalData;
 			vm.family.sheltered=vm.family.sheltered;
 		}
    	
    	vm.educationList = [
    				{id: 0, name: "Elementary"},
    				{id: 1, name: "Middle"},
    				{id: 2, name: "HS"},
    				{id: 3, name: "2 year college degee"},
    				{id: 4, name: "graduate"},
    				{id: 5, name: "post graduate"}
    				];
    	vm.housingStatus = [
    			{id: 0, name: "Sheltered"},
    			{id: 1, name: "Unsheltered"}
    			];
    	vm.liveWithList =[					//not in db
    		{id: 0, name: "Family"},
			{id: 1, name: "Friends"},
			{id: 2, name: "Alone"}
    	];
    	vm.save = function(){ 
    	var data = {
    			"sliblings": vm.family.sliblings,
    		    "kids": vm.family.kids,
    		    "liveAtHome": vm.family.liveAtHome,
    		    "sheltered": vm.family.sheltered,
    		    "parentEducation": vm.family.parentEducation,
    		    "education": vm.family.education,
    		    "enrollmentStatus": vm.family.enrollmentStatus,
    		    "enrollmentLocation": vm.family.enrollmentLocation,
    			}
    	console.log(data);
    	 clientEnrollmentService.setFamilyData(data);
    	 $rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
		 //var serviceCalls = clientEnrollmentService.savePartial();
    	}
	}
})();