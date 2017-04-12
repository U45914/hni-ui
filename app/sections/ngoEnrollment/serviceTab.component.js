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
  
  serviceController.$inject = ['$q','ngoEnrollmentService','$rootScope']; 
  
  function serviceController ($q,ngoEnrollmentService,$rootScope) {
	  var vm =this;
	  vm.list= [];
	  vm.flag="false";
	  
	  vm.options1 = [];
      for (var i = 0; i < 10; i++) {
          vm.options1.push({ key: i + 1, value: 'Prop' + (i + 1).toString() });
      } 
  
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
	  vm.expanded="false";
	  vm.resources = [ "X","Y", "Z"];
	  vm.resourceList= [];
	  
	  vm.foodBbank = function(fdBank){
		  	if(vm.bank && vm.fdBank != null ){
			  vm.list.push(fdBank);
			  vm.flag=true;
			  vm.fdBank=" ";
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
			  "resource":vm.resourceList
			  };
			  
			  	if(vm.qty1!=null || vm.qty2!=null || vm.qty3!=null || vm.qty4 !=null || vm.card !=null ||vm.other !=null && vm.monthlyCost !=null && vm.foodStamp !=null && vm.select !=null ){
			  		ngoEnrollmentService.serviceData = data; 
			  		$rootScope.$broadcast("scroll-tab", [1,2]);
			  		var serviceCalls = ngoEnrollmentService.postServiceList(data);
					return $q.all(serviceCalls);
					 
				   }
				 else{
					 window.alert("Please fill Fields");
				
				        return false;
					 
				 }
		  }
		  
		  vm.showCheckboxes=function() {
				vm.flag="true";
				debugger;
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