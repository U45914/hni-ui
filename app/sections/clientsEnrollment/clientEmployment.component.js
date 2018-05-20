(function() {
	angular
		.module('app')
		
		 .directive('clientEmployment', clientEmploymentDirective)
	
	
	function clientEmploymentDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "clientEmployment.tpl.html",
			controller : clientEmploymentController,
			 controllerAs: 'vm'
		}
	}
	
	clientEmploymentController.$inject = ['$q','clientEnrollmentService','$scope','$rootScope','$state','toastService'];
	
	function clientEmploymentController($q,clientEnrollmentService,$scope,$rootScope,$state,toastService){
    	var vm = this;
    	vm.employed = false;
    	vm.unEmployed = false;
    	vm.residentList = [
    		{id: 0, name: "Undocumented immigrant"},
			{id: 1, name: "Travel visa"},
			{id: 2, name: "Student visa"},
			{id: 3, name: "Work visa"},
			{id: 4, name: "Green card"},
			{id: 5, name: "US citzen"}
    	];
    	
    	vm.avgWrkHrs = [
    		{id: 0, name: "1-10"},
			{id: 1, name: "11-20"},
			{id: 2, name: "21-30"},
			{id: 3, name: "31-40"},
			{id: 4, name: "More than 40"}
    	];
    	
    	vm.rateList = [
    		{id: 0, name: "Hourly"},
			{id: 1, name: "Daily"},
			{id: 2, name: "Weekly"},
			{id: 3, name: "Monthly"}
    	];
    	
    	vm.wrkStatusList = [
    		{id: 0, name: "Employed"},
    		{id: 1, name: "Internship"},
    		{id: 2, name: "Unemployed"},
    		{id: 3, name: "I have never had a job"}
    	];
    	
    	vm.timeToWrkplace =[
    		{id: 0, name: "0-15"},
    		{id: 1, name: "15-30"},
    		{id: 2, name: "30-45"},
    		{id: 3, name: "45-60"},
    		{id: 4, name: "60-75"},
    		{id: 5, name: "More than 2 hours"}
    	];
    	
    	vm.noJobs =[
    		{id: 0, name: "1"},
    		{id: 1, name: "2"},
    		{id: 2, name: "3"},
    		{id: 3, name: "More than 3"}
    	];
    	
    	vm.unemplDuration =[
    		{id: 0, name: "0-6 months"},
    		{id: 1, name: "6 months- 1 year"},
    		{id: 2, name: "More than 1 year"},
    	]
    	//vm.emp = clientEnrollmentService.clientEmployment;
    	
    	 $scope.$on("data-loaded-client", function(obj) {
 			vm.load();
 	 });
 	  
 	  vm.load = function() {
 			vm.emp = clientEnrollmentService.finalData;
 			clientEnrollmentService.setEmploymentData(vm.getDataModel(vm.emp));
 			if(vm.emp.workStatus == 2 || vm.emp.workStatus == 3){
		 		 vm.unEmployed = true; 
		 		vm.employed = false;
		 	  }else if(vm.emp.workStatus == 0 || vm.emp.workStatus == 1){
			 		 vm.employed = true;
				 		vm.unEmployed = false; 
				 	  }else{
				 		 vm.employed = false;
					 	 vm.unEmployed = false; 
				 	  }
 		}
	vm.save = function(isTopTabClicked){ 
		var data = vm.getDataModel(vm.emp);
		console.log(data);
		clientEnrollmentService.setEmploymentData(data)		
		var serviceCalls = clientEnrollmentService.savePartial();
		if(!isTopTabClicked){
			$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
		}
	}
    	
    	vm.getDataModel = function (emp){
    		var data = {
        		    "workStatus": vm.emp.workStatus,
        		    "timeToWorkplace": vm.emp.timeToWorkplace,
        		    "noOfJob": vm.emp.noOfJob,
        		    "employer": vm.emp.employer,
        		    "jobTitle": vm.emp.jobTitle,
        		    "durationOfEmployement": vm.emp.durationOfEmployement,
        		    "unemploymentBenfits": vm.emp.unemploymentBenfits,
        		    "reasonUnemploymentBenefits": vm.emp.reasonUnemploymentBenefits,
        		    "totalIncome": vm.emp.totalIncome,
        		    "rateAmount": vm.emp.rateAmount,
        		    "rateType": vm.emp.rateType,
        		    "avgHoursPerWeek": vm.emp.avgHoursPerWeek,
        		    "residentStatus": vm.emp.residentStatus,
        		    "dollarSpendFood": vm.emp.dollarSpendFood,
        		    "dollarSpendClothes": vm.emp.dollarSpendClothes,
        		    "dollarSpendEntertainment": vm.emp.dollarSpendEntertainment,
        		    "dollarSpendTransport": vm.emp.dollarSpendTransport,
        		    "dollarSpendSavings": vm.emp.dollarSpendSavings
        			};
    		return data;
    	}
    	
    	vm.checkEmployed = function(workStatus){
    		if(workStatus == 2 || workStatus == 3){
		 		 vm.unEmployed = true; 
		 		vm.employed = false;
		 	  }else if(workStatus == 0 || workStatus == 1){
			 		 vm.employed = true;
				 		vm.unEmployed = false; 
				 	  }else{
				 		 vm.employed = false;
					 	 vm.unEmployed = false; 
				 	  }
    	}
    	
    	$rootScope.$on("saveTabFour", function(event, data){			
			vm.save(true);
		})
	}
})();