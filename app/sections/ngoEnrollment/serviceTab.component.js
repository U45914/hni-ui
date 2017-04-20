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
  
  serviceController.$inject = ['$q','ngoEnrollmentService','$rootScope']; 
  
  function serviceController ($q,ngoEnrollmentService,$rootScope) {
	  var vm =this;
	  vm.list= [];
	  vm.flag="false";
	  
	  vm.options1 = [];
      for (var i = 0; i < 10; i++) {
          vm.options1.push({ key: i + 1, value: 'Prop' + (i + 1).toString() });
      } 
  
	  vm.breakfast=[];
	  vm.lunch=[];
	  vm.dinner=[];
	 
	  
	  vm.mealsArray = [vm.breakfast, vm.lunch, vm.dinner]
	  
	  vm.days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	  vm.frequency = ["Breakfast","Lunch","Dinner"];
	  
	  vm.obj={};
	  vm.expanded="false";
	  vm.resources = [ "X","Y", "Z"];
	  vm.resourceList= [];
	  
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
		  
		  vm.cal = function(x,y, event){
			  var isChecked = event.target.checked;
			  var day = vm.days[x];
			  var mealType = vm.frequency[y];
			  
			  if(isChecked){
				  vm.mealsArray[y].push(day);
				  vm.obj[mealType] = vm.mealsArray[y];
				 
			  }else{
				  var index = vm.mealsArray[y].indexOf(day);
				  vm.mealsArray[y].splice(index, 1);				 
				  vm.obj[mealType] = vm.mealsArray[x];
		 //  If the days are empty, the meal array corresponding that days are removed from the obj array 
				  if(vm.mealsArray[y].length == 0){
					  delete vm.obj[mealType];
				  }
			  } 
			
		  }
		  vm.service = ngoEnrollmentService.serviceData;
		  
		  vm.save =  function(){
			  var data = {
			  "brkfstChk": vm.service.brkfstChk, 
			  "brkfstQty" : vm.service.brkfstQty,
			  "lunchChk": vm.service.lunchChk,
			  "lunchQty":vm.service.lunchQty,
			  "dinnerChk":vm.service.dinnerChk,
			  "dinnerQty":vm.service.dinnerQty,
			  "baggedChk":vm.service.baggedChk,
			  "baggedQty":vm.service.baggedQty,
			  "giftCard":vm.service.giftCard,
			  "other":vm.service.other,	
			  "serviceCalender":vm.obj,
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
					 window.alert("Please fill Fields");
				
				        return false;
					 
				 }
		  }
		  
		  vm.showCheckboxes=function() {
				vm.flag="true";
			  var checkboxes = document.getElementById("checkboxes");
			  if (!vm.expanded) {
			    checkboxes.style.display = "block";
			    vm.expanded = true;
			  } else {
			    checkboxes.style.display = "none";
			    vm.expanded = false;
			  }
			}
		  
			vm.select = function(index,event){
				var isChecked = event.target.checked;
				if(isChecked){
				vm.resourceList.push(vm.resources[index]);
				}else{
					vm.resourceList.splice(index,1);
				}
				console.log(vm.resourceList);
			}	  
  }	  
	  
	  
  })();