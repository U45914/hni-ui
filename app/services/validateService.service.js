(function(){
	angular
		.module('app')
		.service('validateService',validateService);
	
	validateService.$inject = ['$http','serviceConstants'];
	
	function validateService($http,serviceConstants){
		  let baseUrl = serviceConstants.baseUrl;
		return{
			validateCredentials,
			validateNGOOnboard,
			validateNGOEnrollment,
			validateNGOAdd,
			validateStateDrpdwn,
			validateNGOEnrollmentData,
			checkEmailAvailability,
			getFormattedErrorMessageForUser
		};
		
		
		/*
		 * 
		 * Method to validate the login credentials
		 * 
		 */
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
		
		/*
		 * 
		 * Method to validate NGO onboarding form
		 * 
		 */
		function validateNGOOnboard(data){
			var address = data.addresses;
			var errorFields = "";
			if(data.name==null)
				errorFields += "Name, " ;
			if(data.phone==null || isNaN(Number(data.phone.replace(/-/g, ""))))
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
		
		/*
		 * 
		 * Method to validate the NGO Enrollment form
		 * 
		 */
		
		function validateNGOEnrollment(data,confirmPassword){
			var errorFields = "";
			if(data.firstName==null)
				errorFields += "First Name, ";
			if(data.lastName==null)
				errorFields += "Last Name, ";
			if(data.email==null)
				errorFields += "Email, ";
			if(data.mobilePhone==null)
				errorFields += "Phone, ";
			else{
				var phone = data.mobilePhone;
				var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
				var res = patt.test(phone);
				if (res != true || isNaN(Number(phone.replace(/-/g, "")))) {
					errorFields += "Phone, ";
				}
			}
			if(data.password==null || data.password!=confirmPassword ){
				if(data.password==null){
					errorFields += "Password ";
				}else{
					errorFields += "Password Mismatch ";
				}
			}
			return errorFields;
		}
		
		/*
		 * 
		 * Method to validate the form when an NGO adds another NGO
		 * 
		 */
		
		function validateNGOAdd(data){
			var errorFields = "";
			/*if(data.name==null)
				errorFields += "Name, ";*/
			if(data.firstName==null)
				errorFields += "First Name, ";
			if(data.lastName==null)
				errorFields += "Last Name, ";
			if(data.phone==null || isNaN(Number(data.phone.replace(/-/g, ""))))
				errorFields += "Phone, ";
			if(data.email==null)
				errorFields += "Email, ";
			/*if(data.genderCode==null)
				errorFields += "Gender ";*/
			return errorFields;
		}
		
		function validateStateDrpdwn(){
			var states = [	{value :"AL",name :"Alaska"},
							{value :"AR",name :"Arkansas"},
							{value :"FL",name :"Florida"},
							{value :"NJ",name :"New Jersy"},
							{value :"NY",name :"New York"},
							{value :"WA",name :"Washington"}];
			return states;

		}
				
		/*
		 * 
		 * Method to validate the NGO Profile data
		 * This method will return errors object if anything exists
		 * error object will be in below format
		 * {
		 * 	"field": fileName,
		 * 	"component" "Overview",
		 *  "message": description for validation error,
		 *  "focus": true or false focusing column,
		 *  "severity": scale error validation
		 *  }
		 * 
		 */
		
		function getErrorObject(fieldName, viewName, errorMessage, focusOn, serverity) {
			var errorObject = {
					field: fieldName,
					component: viewName,
					message:errorMessage,
					focus: focusOn,
					severity: serverity
			}
			
			return errorObject;
		}
		
		
		function validateNGOEnrollmentData(data){
			var validationErrors = [];
			
			var overviewTabValidationErrors = validateNGOEnrollmentTabOverview(data.overviewData);
			validationErrors = overviewTabValidationErrors;
			
			
			var clientTabValidationErrors = validateNGOEnrollmentTabClient(data.clientData);
			validationErrors = validationErrors.concat(clientTabValidationErrors);

			var serviceTabValidationErrors = validateNGOEnrollmentTabService(data.serviceData);
			validationErrors = validationErrors.concat(serviceTabValidationErrors);
			
			return validationErrors;
		}
		
		/*
		 * 
		 * Method to validate the NGO Profile data : Overview
		 * 
		 */
		
		var FIELD_OVERVIEW_TAB_NAME = "name";
		var FIELD_OVERVIEW_CONTACT_NAME = "contactName";
		var FIELD_OVERVIEW_TAB_PHONE = "mobilePhone";
		var FIELD_OVERVIEW_TAB_WEBSITE = "website";
		var FIELD_OVERVIEW_TAB_ADDRESS_1 ="address1";
		var	FIELD_OVERVIEW_TAB_CITY = "city";
		var FIELD_OVERVIEW_TAB_STATE = "state";
		var FIELD_OVERVIEW_TAB_ZIP_COE = "zipCode";
		var FIELD_OVERVIEW_TAB_FTE = "fte";
		var FIELD_OVERVIEW_TAB_OVER_VIEW = "overview";
		var FIELD_OVERVIEW_TAB_MISSION_STATEMENT = "missionStatement";
		
		function validateNGOEnrollmentTabOverview(data){
			var overViewTabValidationErrors = [];
			
			if(data != null){
				if(data.name == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_NAME, "Overview",  "NGO Name", false, 1));
				}
				if(data.contactName == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_CONTACT_NAME, "Overview", "Contact Name", false, 1));
				}
				if(data.mobilePhone == null || isNaN(Number(data.mobilePhone.replace(/-/g, "")))){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_PHONE, "Overview", "Phone number field", false, 1));
				} else if(isNaN(Number(data.mobilePhone.replace(/-/g, "")))){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_PHONE, "Overview", data.mobilePhone + " is not a valid value for phone", false, 1));
				}
				if(data.website == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_WEBSITE, "Overview", "Website url", false, 1));
				}
				if(data.address.address1 == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_ADDRESS_1, "Overview", "Address details", false, 1));
				}
				if(data.address.city == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_CITY, "Overview", "City", false, 1));
				}
				if(data.address.state == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_STATE, "Overview", "State", false, 1));
				}
				if(data.address.zip == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_ZIP_COE, "Overview", "Zipcode", false, 1));
				}
				if(data.employees == null || !angular.isNumber(data.employees)){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_FTE, "Overview", "Full time employees", false, 1));
				}
				if(data.overview == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_OVER_VIEW, "Overview", "Overview", false, 1));
				}
				if(data.mission == null){
					overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_MISSION_STATEMENT, "Overview", "Please provide value for mission statement", false, 1));
				}
			}
			else{
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_NAME, "Overview", "NGO Name", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_CONTACT_NAME, "Overview", "Contact Name", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_WEBSITE, "Overview", "Website url", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_ADDRESS_1, "Overview", "Address details", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_CITY, "Overview", "City", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_STATE, "Overview", "State", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_ZIP_COE, "Overview", "Zipcode", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_FTE, "Overview", "Full time employees", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_OVER_VIEW, "Overview", "Overview", false, 1));
				overViewTabValidationErrors.push(getErrorObject(FIELD_OVERVIEW_TAB_MISSION_STATEMENT, "Overview", "Mission statement", false, 1));
			}

			return overViewTabValidationErrors;
		}
		
		/*
		 * 
		 * Method to validate the NGO Profile data : StakeHoders
		 * 
		 */
		function validateNGOEnrollmentTabStakeHolders(data){
			var errorJson = {};
			var errorArray = [];
			if(data != null){
				var boardMembers = data.boardMembers;
				var brandPartners = data.brandPartners;
				var localPartners = data.localPartners;
				
				if(boardMembers.length>0){
					for(var index=0; index<boardMembers.length; index++){
						if(boardMembers[index].name == null){
							errorArray.push({ field : "Board Member "+(index+1), value : "Name" });
						}
						if(boardMembers[index].company == null){
							errorArray.push({field : "Board Member "+(index+1), value : "Company" });
						}
		
					}
				}
				
				if(brandPartners.length>0){
					for(var index=0; index<brandPartners.length; index++){
						if(brandPartners[index].company == null){
							errorArray.push({ field : "Brand Partner "+(index+1), value : "Company" });
						}
						if(brandPartners[index].phoneNumber == null || isNaN(Number(brandPartners[index].phoneNumber.replace(/-/g, "")))){
							errorArray.push({ field : "Brand Partner "+(index+1), value : "Phone Number" });
						}
					}
				}

				if(localPartners.length>0){
					for(var index=0; index<localPartners.length; index++){
						if(localPartners[index].company == null){
							errorArray.push({field : "Local Partners "+(index+1), value : "Company"});
						}
						if(localPartners[index].phoneNumber == null || isNaN(Number(localPartners[index].phoneNumber.replace(/-/g, "")))){
							errorArray.push({field : "Local Partners "+(index+1), value : "Phone  Number"});
						}
					}
				}
			}
			errorJson = errorArray;
			return errorJson;
		}
		
		/*
		 * 
		 * Method to validate the NGO Profile data : Service
		 * 
		 */
		function validateNGOEnrollmentTabService(data){
			var serviceTabValidationErrors = [];
			
			if(data != null){
				if(data.brkfstChk == true){
					if(data.brkfstQty == null || !angular.isNumber(data.brkfstQty)){
						serviceTabValidationErrors.push(getErrorObject("brkfstQty", "Services",  "Please provide breakfast quantity", false, 1));
					}
				} 
				
				if(data.lunchChk == true){
					if(data.lunchQty == null || !angular.isNumber(data.lunchQty)){
						serviceTabValidationErrors.push(getErrorObject("lunchQty", "Services",  "Please provide lunch quantity", false, 1));
					}
					
				}
				
				if(data.dinnerChk == true){
					if(data.dinnerQty == null || !angular.isNumber(data.dinnerQty)){
						serviceTabValidationErrors.push(getErrorObject("dinnerQty", "Services",  "Please provide dinner quantity", false, 1));
					}
				}
				
				if(data.baggedChk == true){
					if(data.baggedQty == null || !angular.isNumber(data.baggedQty)){
						serviceTabValidationErrors.push(getErrorObject("baggedQty", "Services",  "Please provide bagged quantity", false, 1));
					}
				}
				
				if(data.monthlyBudget == null){
					serviceTabValidationErrors.push(getErrorObject("monthlyBudget", "Services",  "Please provide value for monthly budget", false, 1));
				}
				
				if(data.volunteerNbr == null || !angular.isNumber(data.volunteerNbr)){
					serviceTabValidationErrors.push(getErrorObject("volunteerNbr", "Services",  "Please provide value for volunteer required", false, 1));
				}
				
				if(data.foodStamp == null){
					serviceTabValidationErrors.push(getErrorObject("foodStamp", "Services",  "Please select a oprion for food stamp", false, 1));
				}
				
				if(data.foodBankSelect == null){
					serviceTabValidationErrors.push(getErrorObject("foodBankSelect", "Services",  "Please select a option for food bank", false, 1));
				} else if (data.foodBankSelect == true) {
					//TODO: Need to check with actual data
					/*if (data.foodBankValue == null || data.foodBankValue.length == 0) {
						serviceTabValidationErrors.push(getErrorObject("foodBankSelect", "Services",  "Please give values for food bank", false, 1));
					}*/
				}
				
			}	
			else{
				serviceTabValidationErrors.push(getErrorObject("monthlyBudget", "Services",  "Please provide value for monthly budget", false, 1));
				serviceTabValidationErrors.push(getErrorObject("foodStamp", "Services",  "Please select a option for food stamp", false, 1));
				serviceTabValidationErrors.push(getErrorObject("foodBankSelect", "Services",  "Please select a option for food bank", false, 1));
				serviceTabValidationErrors.push(getErrorObject("volunteerNbr", "Services",  "Please provide value for volunteer required", false, 1));
				
			}
			return serviceTabValidationErrors;
		}
		
		/*
		 * 
		 * Method to validate the NGO Profile data : Funding
		 * 
		 */
		function validateNGOEnrollmentTabFunding(data){
			var errorJson = {};
			var errorArray = [];
			if(data != null){
				var fundingSource = data.fundingSource;
				var mealDonation = data.mealDonation;
				var mealFunding = data.mealFunding;
				
				for(var index=0; index<fundingSource.length; index++){
					if(fundingSource[index].source == null){
						errorArray.push("Source");
					}
					if(fundingSource[index].amount == null  || !angular.isNumber(fundingSource[index].amount)){
						errorArray.push("Amount");
					}
				}
				
				for(var index=0; index<mealDonation.length; index++){
					if(mealDonation[index].source == null){
						errorArray.push("Source");
					}
					if(mealDonation[index].mealQty == null || !angular.isNumber(mealDonation[index].mealQty)){
						errorArray.push("Meal Quantity");
					}
					if(mealDonation[index].frequency == null){
						errorArray.push("Frequency");
					}
				}
				
				for(var index=0; index<mealFunding.length; index++){
					if(mealFunding[index].source == null){
						errorArray.push("Source");
					}
					if(mealFunding[index].amount == null  || !angular.isNumber(mealFunding[index].amount)){
						errorArray.push("Amount");
					}
				}	
			}
			else{
				errorArray.push({field : "Funding Tab", value : "Empty"});
				}
			errorJson = errorArray;
			return errorJson;
			
		}
		
		/*
		 * 
		 * Method to validate the NGO Profile data : Client
		 * 
		 */
		function validateNGOEnrollmentTabClient(data){

			var ngoClientTabValidationErrors = [];
			
			if(data != null) {
				if(data.individualClientInfoCollected) {
					if(data.storeClientInfo == null){
						ngoClientTabValidationErrors.push(getErrorObject("storeClientInfo", "Participant",  "Please provide details for how you store client information", false, 1));
					}
				}
				if(!data.individualsServedDaily || data.individualsServedDaily  == null) {
					ngoClientTabValidationErrors.push(getErrorObject("individualsServedDaily", "Participant",  "Please provide value individual served daily", false, 1));
				}
				if(!data.individualsServedMonthly || data.individualsServedMonthly == null) {
					ngoClientTabValidationErrors.push(getErrorObject("individualsServedMonthly", "Participant",  "Please provide value individual served monthly", false, 1));
				}
				if(!data.individualsServedAnnually || data.individualsServedAnnually == null) {
					ngoClientTabValidationErrors.push(getErrorObject("individualsServedAnnually", "Participant",  "Please provide value individual served annually", false, 1));
				}
				
			}
			return ngoClientTabValidationErrors;
		}
		
		 function checkEmailAvailability(username) {
         	var usernameObject = {"username": username}
         	return $http.post(`${baseUrl}/onboard/validate/username`, usernameObject);
         }
		 
		 function getFormattedErrorMessageForUser(errorObjects) {
			 // First group error messages by component
			 var components = {};
			 angular.forEach(errorObjects, function(error) {
				 if (components[error.component]) {
					 components[error.component].push(error);
				 } else {
					 components[error.component] = [];
					 components[error.component].push(error);
				 }
			 });
			 
			 var messageToUser = "";
				 
			 messageToUser += "<ul>";
			 angular.forEach(components, function(errorsList, key){
				 messageToUser += "<br />One or more mandatory fields not filled in " + key;
				 angular.forEach(errorsList, function(error){
					 messageToUser += "<li>" + error.message + "</li>";
				 });
			 });
			 messageToUser += "</ul>";
			 
			 return messageToUser;
		 }
	}
})();