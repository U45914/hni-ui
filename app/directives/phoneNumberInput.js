(function() {
    angular
        .module('app')
        .directive('phoneNumberInput', phoneNumberInput);

    phoneNumberInput.$inject = [];

    function phoneNumberInput() {
        return {
        	restrict: 'A',
        	require: '?ngModel',
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            if (!ctrl) return;

            scope.$watch(attrs.ngModel, function (num) {
	        	 if (num &&  num != null)
	 		      {
	        		 num = num.split('-').join("");
	        		 var newPhone = "";
	        		 if (num.length >= 3) {
	        			 newPhone = num.substring(0,3) + "-";
	        		 }
	        		 if (num.length > 3) {
	        			 newPhone += num.substring(3, 6) + "-";
	        		 }
	        		 if (num.length > 6) {
	        			 newPhone += num.substring(6, 10);
	        		 }
	        		 if (newPhone == "") {
	                        newPhone = num;
	                 }
	        		 element.val(newPhone);
	 		      } 
               
            });
        }
    }
})();