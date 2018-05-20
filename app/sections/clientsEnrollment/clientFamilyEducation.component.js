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
	
	clientFamilyEducationController.$inject = ['$q','clientEnrollmentService','commonUserProfileConfigService','$scope','$rootScope','$state','toastService'];
	
	function clientFamilyEducationController($q,clientEnrollmentService,commonUserProfileConfigService,$scope,$rootScope,$state,toastService){
    	var vm = this;
    	//vm.family = clientEnrollmentService.clientEmployment;
    	
    	vm.configData = commonUserProfileConfigService.participantProfileConfig;
    	
    	 $scope.$on("data-loaded-client", function(obj) {
 			vm.load();
 	 });
 	  
 	  vm.load = function() {
 			vm.family = clientEnrollmentService.finalData;
 			vm.family.sheltered=vm.family.sheltered;
 			clientEnrollmentService.setFamilyData(vm.getDataModel(vm.family));
 		}
    	
    	vm.educationList = [
    				{id: 0, name: "Elementary"},
    				{id: 1, name: "Middle"},
    				{id: 2, name: "High School"},
    				{id: 3, name: "2 year college degee"},
    				{id: 4, name: "Graduate"},
    				{id: 5, name: "Post graduate"}
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
    	vm.save = function(isTopTabClicked){ 
	    	var data = vm.getDataModel(vm.family);
	    	console.log(data);
	    	clientEnrollmentService.setFamilyData(data);
	    	var serviceCalls = clientEnrollmentService.savePartial();

	    	if(!isTopTabClicked){
	    		$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
	    	}
	    	
			
    	}
    	
    	vm.getDataModel = function(family){
    		var data = {
        			"sliblings": vm.family.sliblings,
        		    "kids": vm.family.kids,
        		    "liveAtHome": vm.family.liveAtHome,
        		    "sheltered": vm.family.sheltered,
        		    "liveWith": vm.family.liveWith,
        		    "parentEducation": vm.family.parentEducation,
        		    "education": vm.family.education,
        		    "enrollmentStatus": vm.family.enrollmentStatus,
        		    "enrollmentLocation": vm.family.enrollmentLocation,
        			};
    		return data;
    	}
    	
    	$rootScope.$on("saveTabThree", function(event, data){			
			vm.save(true);
		})
	}
})();