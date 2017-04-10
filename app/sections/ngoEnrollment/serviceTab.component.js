(function () {
  angular
      .module('app')
      
      .directive('serviceTab', serviceDirective)
	
	
	function serviceDirective() {
		return {
			scope : {
				//memberList : "=list"
			},
			restrict : "E",
			templateUrl : "serviceTab.tpl.html",
			controller : serviceController,
			 controllerAs: 'vm'
		}

	}
  
  serviceController.$inject = ['$q','ngoEnrollmentService']; 
  
  function serviceController ($q,ngoEnrollmentService) {
	  var vm =this;
	  vm.list= [];
	  
	  vm.sunday=[];
	  vm.monday=[];
	  vm.tuesday=[];
	  vm.wednesday=[];
	  vm.thursday=[];
	  vm.friday=[];
	  vm.saturday=[];
	  
	  vm.daysArray = [vm.sunday, vm.monday, vm.tuesday, vm.wednesday, vm.thursday, vm.friday, vm.saturday]
	  
	  vm.days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
	  vm.frequency = ["Breakfast","Lunch","Dinner"];
	  
	  vm.obj={};
	  
	  vm.foodBbank = function(fdBank){
		  	if(vm.select){
			  vm.list.push(fdBank);
			  vm.flag=true;
			  
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
				  vm.daysArray[x].push(mealType)
				  vm.obj[day] = vm.daysArray[x];
			  }else{
				  var index = vm.daysArray[x].indexOf(mealType);
				  vm.daysArray[x].splice(index, 1);				 
				  vm.obj[day] = vm.daysArray[x];
		 //  If the mealType is empty, the array corresponding that mealType is removed from the obj array 
				  if(vm.daysArray[x].length == 0){
					  delete vm.obj[day];
				  }
				  
			 
			  }
			  console.log(vm.obj);
			  
			  
		  }
		  vm.save =  function(){
			  var data = {
			  "brkfstQty" : vm.qty1,
			  "lunchQty":vm.qty2,
			  "dinnerQty":vm.qty3,
			  "baggedQty":vm.qty4,
			  "giftCard":vm.card,
			  "other":vm.other,			  
			  "monthlyBudget":vm.monthlyCost,
			  "operatingCost":vm.operatingCost,
			  "personnelCost":vm.personnelCost,
			  "volunteerNbr":vm.volReq,
			  "foodStamp":vm.foodStamp,
			 // "foodBankSelect": vm.select,
			  "foodBankValue":vm.list,
			  "resource":vm.resource
			  };
			  
			  	if(vm.qty1!=null || vm.qty2!=null || vm.qty3!=null || vm.qty4 !=null || vm.card !=null ||vm.other !=null && vm.monthlyCost !=null && vm.foodStamp !=null && vm.select !=null ){
			  		 console.log(data); 
			  		var serviceCalls = ngoEnrollmentService.serviceList(data);
					 return $q.all(serviceCalls);
				   }
				 else{
					 window.alert("Please fill Fields");
					// document.getElementById('name').style.borderColor = "red";
				        return false;
					 
				 }
		  }
		  
  }	  
	  
	  
  })();