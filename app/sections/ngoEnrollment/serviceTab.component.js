(function () {
  angular
      .module('app')
      
      .directive('serviceTab', serviceDirective)
	
	
	function serviceDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "serviceTab.tpl.html",
			controller : serviceController,
			 controllerAs: 'vm'
		}

	}
  

  serviceController.$inject = ['$q','ngoEnrollmentService','$rootScope','$mdToast']; 
  
  function serviceController ($q,ngoEnrollmentService,$rootScope,$mdToast) {
	   

	  var vm =this;
	  vm.list= [];
	  vm.flag=false;
	  vm.flag1=false;
	  
	  
	  vm.breakfast=[];
	  vm.lunch=[];
	  vm.dinner=[];
	 
	  
	  vm.mealsArray = [vm.breakfast, vm.lunch, vm.dinner];
	  vm.brkfstAvailabilty = [];
	  vm.lunchAvailabilty = [];
	  vm.dinnerAvailabilty = [];
	  
	  vm.days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	  vm.frequency = ["Breakfast","Lunch","Dinner"];
	  
	  vm.obj={};
	  vm.expanded="false";
	  vm.resources = [ "X","Y", "Z"];
	  vm.resourceList= [];
	  
	  $scope.$on("data-loaded-ngo", function(obj) {
			vm.load();
		});
	  
	  vm.foodBbank = function(foodBankValue){
		  	if( foodBankValue != null ){
			  vm.list.push(foodBankValue);
			  vm.flag=true;
			  vm.service.foodBankValue=" ";
		  	} 
	  } 	
		  vm.delRow = function(index){  
			 vm.list.splice(index, 1);
			} 
		  

		  vm.cal = function(row,column, event){
			  var isChecked = event.currentTarget.getAttribute("class").indexOf("md-checked") == -1;
			  var day = vm.days[row];
			  var mealType = vm.frequency[column];

			  
			  if(isChecked){
				  if(mealType=="Breakfast"){
					  vm.brkfstAvailabilty.push(day);
				  }
				  else if(mealType=="Lunch"){
					  vm.lunchAvailabilty.push(day);
				  }
				  else if(mealType=="Dinner"){
					  vm.dinnerAvailabilty.push(day);
				  }
			  }else{
				  if(mealType=="Breakfast"){
					  var idx = vm.brkfstAvailabilty.indexOf(day);
					  vm.brkfstAvailabilty.splice(idx,1);
				  }
				  else if(mealType=="Lunch"){
					  var idx = vm.lunchAvailabilty.indexOf(day);
					  vm.lunchAvailabilty.splice(idx,1);
				  }
				  else if(mealType=="Dinner"){
					  var idx = vm.dinnerAvailabilty.indexOf(day);
					  vm.dinnerAvailabilty.splice(idx,1);
				  }
			  } 
			
		  }
		  
		  
		  if(vm.list){
			  vm.flag1=true;
		  }
		  
		 /* vm.showCustomToast = function(msg) {
		        $mdToast.show({
		          hideDelay   : 3000,
		          position    : 'top right',
		          controller  : 'ToastCtrl',
		          templateUrl : 'toast-template.html'
		        });
		      };*/
		  
		  vm.save =  function(){
			  var data = {
			  "brkfstChk": vm.service.brkfstChk, 
			  "brkfstQty" : vm.service.brkfstQty,
			  "brkfstAvailabilty": vm.brkfstAvailabilty,
			  "lunchChk": vm.service.lunchChk,
			  "lunchQty":vm.service.lunchQty,
			  "lunchAvailabilty": vm.lunchAvailabilty,
			  "dinnerChk":vm.service.dinnerChk,
			  "dinnerQty":vm.service.dinnerQty,
			  "dinnerAvailabilty": vm.dinnerAvailabilty,
			  "baggedChk":vm.service.baggedChk,
			  "baggedQty":vm.service.baggedQty,
			  "giftCard":vm.service.giftCard,
			  "other":vm.service.other,	
			  "monthlyBudget":vm.service.monthlyBudget,
			  "operatingCost":vm.service.operatingCost,
			  "personalCost":vm.service.personalCost,
			  "volunteerNbr":vm.service.volunteerNbr,
			  "foodStamp":vm.service.foodStamp,
			  "foodBankSelect": vm.service.foodBankSelect,
			  "foodBankValue":vm.list,
			  "resource":vm.resourceList
			  };
			  
			  	if(vm.service.brkfstQty!=null || vm.service.lunchQty!=null || vm.service.dinnerQty!=null || vm.service.baggedQty !=null || vm.service.giftCard !=null ||vm.service.other !=null && vm.service.monthlyBudget !=null && vm.service.foodStamp !=null && vm.service.foodBankSelect !=null ){
			  		ngoEnrollmentService.setServiceData(data);
			  		var serviceCalls = ngoEnrollmentService.savePartial();
			  		$q.all(serviceCalls)//.then(onSuccess,onError);
			  		$rootScope.$broadcast("scroll-tab", [1,2]);
			  		
				   }
				 else{
					 //vm.showCustomToast("fill the mandatory fields");
				     return false;
				 }
		  }
		  
		  vm.showCheckboxes=function() {
				vm.flag="true";
			  /*var checkboxes = document.getElementById("checkboxes");
			  if (!vm.expanded) {
			    checkboxes.style.display = "block";
			    vm.expanded = true;
			  } else {
			    checkboxes.style.display = "none";
			    vm.expanded = false;
			} */ 
		}

		vm.showCheckboxes = function() {
			vm.flag = true;
			return vm.flag;
			/*var checkboxes = document.getElementById("checkboxes");
			if (!vm.expanded) {
				checkboxes.style.display = "block";
				vm.expanded = true;
			} else {
				checkboxes.style.display = "none";
				vm.expanded = false;
			}*/
		}
		
		vm.test = function(){
			vm.flag = false;
			return vm.flag;
		}
		 
		
		
		vm.select = function(index, event) {
			var isChecked = event.target.checked;
			if (isChecked) {
				vm.resourceList.push(vm.resources[index]);
				}else{
					vm.resourceList.splice(index,1);
				}
				console.log(vm.resourceList);
			}	  
		vm.load = function() {
			vm.service = ngoEnrollmentService.serviceData;
			debugger;
			  if(vm.service && vm.service.foodBankValue && vm.service.foodBankValue != ""){
				  vm.list = vm.service.foodBankValue;
				  vm.service.foodBankValue="";
			  }
		}
  }	  
	  
	  
  })();