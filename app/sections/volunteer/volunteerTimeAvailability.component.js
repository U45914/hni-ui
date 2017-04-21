(function () {
  angular
      .module('app')
      .component('volunteerTimeAvailability',{
          bindings: {

          },
          templateUrl: 'volunteerTimeAvailability.tpl.html',
          controller: volunteerTimeAvailabilityController,
          controllerAs: 'vm'
  }) ;
  volunteerTimeAvailabilityController.$inject = ['$q','volunteerService'];

  function volunteerTimeAvailabilityController($q,volunteerService) {
      var vm = this;
      
      vm.sunday=[];
	  vm.monday=[];
	  vm.tuesday=[];
	  vm.wednesday=[];
	  vm.thursday=[];
	  vm.friday=[];
	  vm.saturday=[];
	  vm.obj={};
	  
	  vm.daysArray = [ vm.sunday, vm.monday, vm.tuesday, vm.wednesday, vm.thursday, vm.friday, vm.saturday];
	  
	  vm.days = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  vm.availabity = ["8am-10am", "10am-12pm", "12pm-2pm", "2pm-4pm", "4pm-6pm", "6pm-8pm","8pm-10pm"];
	  
	  
	  vm.cal = function(x,y, event){
		  var isChecked = event.target.checked;
		  var day = vm.days[y];
		  var time = vm.availabity[x];
		  
		  
		  if(isChecked){
			  vm.daysArray[y].push(time);
			  vm.obj[day] = vm.daysArray[y];
			 
		  }else{
			  var index = vm.daysArray[y].indexOf(day);
			  vm.daysArray[y].splice(index, 1);				 
			  vm.obj[day] = vm.daysArray[x];
	 //  If the days are empty, the meal array corresponding that days are removed from the obj array 
			  if(vm.daysArray[y].length == 0){
				  delete vm.obj[day];
			  }
		  } 
		  
		  vm.submit =  function(){
			  var data = {
					  	"availabilityCalender":vm.obj,
			  			};
			  
			  
			 // volunteerService.volunteerProfileData = data; 
			  var serviceCalls = volunteerService.volunteerTimeAvailability(data);
			  return $q.all(serviceCalls);
		  
		  }
		
	  }
	 
  }
}
)();