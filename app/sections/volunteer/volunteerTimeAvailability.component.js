(function() {
	angular.module('app').component('volunteerTimeAvailability', {
		bindings : {

		},
		templateUrl : 'volunteerTimeAvailability.tpl.html',
		controller : volunteerTimeAvailabilityController,
		controllerAs : 'vm'
	});
	volunteerTimeAvailabilityController.$inject = [ '$q', 'volunteerService' ];

	function volunteerTimeAvailabilityController($q, volunteerService) {
		var vm = this;

		vm.sunday = [];
		vm.monday = [];
		vm.tuesday = [];
		vm.wednesday = [];
		vm.thursday = [];
		vm.friday = [];
		vm.saturday = [];
		vm.obj = {};

		vm.daysArray = [ vm.sunday, vm.monday, vm.tuesday, vm.wednesday, vm.thursday, vm.friday, vm.saturday ];
		vm.days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
		vm.availabity = [ "8am-10am", "10am-12pm", "12pm-2pm", "2pm-4pm", "4pm-6pm", "6pm-8pm", "8pm-10pm" ];

		vm.dayAvailableArray = [{"timeline":"8am-10am","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]},{"timeline":"10am-12pm","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]},{"timeline":"12pm-2pm","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]},{"timeline":"2pm-4pm","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]},{"timeline":"4pm-6pm","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]},{"timeline":"6pm-8pm","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]},{"timeline":"8pm-10pm","weekday":[{"weekday":"Sunday","checked":true},{"weekday":"Monday","checked":true},{"weekday":"Tuesday","checked":true},{"weekday":"Wednesday","checked":true},{"weekday":"Thursday","checked":true},{"weekday":"Friday","checked":true},{"weekday":"Saturday","checked":true}]}];
		vm.shiftOne = [];
		vm.shiftTwo = [];
		vm.shiftThree = [];
		vm.shiftFour = [];
		vm.shiftFive = [];
		vm.shiftSix = [];
		vm.shiftSeven = [];

		vm.cal = function(x, y, event) {
			var isChecked = event.currentTarget.getAttribute("class").indexOf(
					"md-checked") == -1;
			var day = vm.days[y];
			var time = vm.availabity[x];

			if (isChecked) {
				vm.daysArray[y].push(time);
				vm.obj[day] = vm.daysArray[y];

			} else {
				var index = vm.daysArray[y].indexOf(day);
				vm.daysArray[y].splice(index, 1);
				vm.obj[day] = vm.daysArray[x];
				// If the available times are empty, the day array corresponding
				// to that time are removed from the obj array
				if (vm.daysArray[y].length == 0) {
					delete vm.obj[day];
				}
			}
		}
		vm.submit = function() {
			vm.dayAvailableArray.forEach(function(dayAvail) {
				dayAvail.type.forEach(function(day) {
					if (day.checked) {
						if (dayAvail.timeline == '8am-10am') {
							vm.shiftOne.push(day.weekday);
						} else if (dayAvail.timeline == '10am-12pm') {
							vm.shiftTwo.push(day.weekday);
						} else if (dayAvail.timeline == '12pm-2pm') {
							vm.shiftThree.push(day.weekday);
						} else if (dayAvail.timeline == '2pm-4pm') {
							vm.shiftFour.push(day.weekday);
						} else if (dayAvail.timeline == '4pm-6pm') {
							vm.shiftFive.push(day.weekday);
						} else if (dayAvail.timeline == '6pm-8pm') {
							vm.shiftSix.push(day.weekday);
						} else if (dayAvail.timeline == '8pm-10pm') {
							vm.shiftseven.push(day.weekday);
						}
					}
				});
			});
			var data = {
				"shiftOne" : vm.shiftOne,
				"shiftTwo" : vm.shiftTwo,
				"shiftThree" : vm.shiftThree,
				"shiftFour" : vm.shiftFour,
				"shiftFive" : vm.shiftFive,
				"shiftSix" : vm.shiftSix,
				"shiftseven" : vm.shiftseven,
			};

			// volunteerService.volunteerProfileData = data;
			var serviceCalls = volunteerService.saveVolunteerTimeAvailability(data);
			return $q.all(serviceCalls);

		}

	}

})();