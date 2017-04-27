(function(){
	angular
		.module('app')
		.service('validateService',validateService);
	
	validateService.$inject = [];
	
	function validateService(){
		return{
			validateCredentials,
			validateNGOOnboard,
			validateNGOEnrollment,
			validateNGOAdd
		};
		
		function validateCredentials(username, password){
			var errorText = "";
			if(username == null){
				errorText += "Invalid Username";
				return errorText;
			}
			if(password == null){
				errorText += "Invalid Password";
				return errorText;
			}
			if(password.trim()=="" && username.trim()=="" ){
				errorText = "Please fill username & password";
			}
			else if(password==""){
				errorText += "Invalid Password";
			}
			else if(username.trim()==""){
				errorText += "Invalid Username";
			}
			return errorText;
		}
		
		function validateNGOOnboard(data){
			var address = data.addresses;
			var errorFields = "";
			if(data.name==null)
				errorFields += "Name, " ;
			if(data.phone==null)
				errorFields += "Phone, " ;
			if(data.email==null)
				errorFields += "Email, ";
			if(data.website==null)
				errorFields += "Website, " ;
			for(var i = 0; i<address.length; i++){
				if(address[i].name==null)
					errorFields += "Address Name, " ;
				if(address[i].address1==null)
					errorFields += "Address address1, " ;
				if(address[i].city==null)
					errorFields += "Address City, " ;
				if(address[i].state==null)
					errorFields += "Address State, " ;
				if(address[i].zip==null)
					errorFields += "Address Zip" ;
			}
			return errorFields;
		}
		
		function validateNGOEnrollment(data,confirmPassword){
			var errorFields = "";
			if(data.firstName==null)
				errorFields += "First Name, ";
			if(data.lastName==null)
				errorFields += "Last Name, ";
			if(data.email==null)
				errorFields += "Email, ";
			if(data.password==null || data.password!=confirmPassword){
				if(data.password==null){
					errorFields += "Password ";
				}else{
					errorFields += "Password Mismatch ";
				}
			}
			return errorFields;
		}
		
		function validateNGOAdd(data){
			var errorFields = "";
			if(data.name==null)
				errorFields += "Name, ";
			if(data.phone==null)
				errorFields += "Phone, ";
			if(data.email==null)
				errorFields += "Email, ";
			if(data.genderCode==null)
				errorFields += "Gender ";
			return errorFields;
		}
	}
})();