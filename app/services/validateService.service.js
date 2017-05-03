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
			validateNGOAdd,
			validateStateDrpdwn,
			validateNGOEnrollmentData
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
			if(data.phone==null || !angular.isNumber(!isNaN(parseInt(data.phone.replace(/-/g, "")))))
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
				if(address[i].zip==null || !angular.isNumber(address[i].zip))
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
			if(data.password==null || data.password!=confirmPassword){
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
			if(data.name==null)
				errorFields += "Name, ";
			if(data.phone==null || !angular.isNumber(!isNaN(pareseInt(data.phone.replace(/-/g, "")))))
				errorFields += "Phone, ";
			if(data.email==null)
				errorFields += "Email, ";
			if(data.genderCode==null)
				errorFields += "Gender ";
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
		 * 
		 */
		
		function validateNGOEnrollmentData(data){
			var errorText = {};
			var overviewTab = validateNGOEnrollmentTabOverview(data.overviewData);
			var stakeholdersTab = validateNGOEnrollmentTabStakeHolders(data.stakeHolderData);
			var serviceTab = validateNGOEnrollmentTabService(data.serviceData);
			var fundingTab = validateNGOEnrollmentTabFunding(data.fundingData);
			var clientTab = validateNGOEnrollmentTabClient(data.clientData);

			if(overviewTab != ""){
				errorText.Overview = overviewTab;
			}
			if(stakeholdersTab != ""){
				errorText.StakeHolders = stakeholdersTab;
			}
			if(serviceTab != ""){
				errorText.Services = serviceTab;
			}
			if(fundingTab != ""){
				errorText.Funding = fundingTab;
			}
			if(clientTab != ""){
				errorText.Clients = clientTab;
			}
			console.log(errorText);
			return errorText;
		}
		
		/*
		 * 
		 * Method to validate the NGO Profile data : Overview
		 * 
		 */
		
		function validateNGOEnrollmentTabOverview(data){
			var errorText = {};
			var field = [];
			if(data != null){
				if(data.name == null){
					field.push("Name");
				}
				if(data.phone == null || !angular.isNumber(!isNaN(parseInt(data.phone.replace(/-/g, ""))))){
					field.push("Phone");
				}
				if(data.website == null){
					field.push("Website Link");
				}
				if(data.contact == null){
					field.push("Contact Person");
				}
				if(data.address.name == null){
					field.push("Address Type");
				}
				if(data.address.address1 == null){
					field.push("Address 1");
				}
				if(data.address.address2 == null){
					field.push("Address 2");
				}
				if(data.address.city == null){
					field.push("City");
				}
				if(data.address.state == null){
					field.push("State");
				}
				if(data.address.zip == null || !angular.isNumber(data.address.zip)){
					field.push("Zip");
				}
				if(data.employees == null || !angular.isNumber(data.employees)){
					field.push("Full time Employees");
				}
				if(data.overview == null){
					field.push("Overview");
				}
				if(data.mission == null){
					field.push("Mission Statement");
				}
				if(data.promoters == null || data.promoters.length == 0){
					field.push("Celebrity endorsements / notable promoters");
				}
			}
			else{
				field.push({field : "Overview Tab", value : "Empty"});
			}
			errorText = field;
			return errorText;
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
						if(brandPartners[index].phoneNumber == null || !angular.isNumber(!isNaN(parseInt(brandPartners[index].phoneNumber.replace(/-/g, ""))))){
							errorArray.push({ field : "Brand Partner "+(index+1), value : "Phone Number" });
						}
					}
				}

				if(localPartners.length>0){
					for(var index=0; index<localPartners.length; index++){
						if(localPartners[index].company == null){
							errorArray.push({field : "Local Partners "+(index+1), value : "Company"});
						}
						if(localPartners[index].phoneNumber == null || !angular.isNumber(!isNaN(parseInt(localPartners[index].phoneNumber.replace(/-/g, ""))))){
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
			var errorJson = {};
			var errorArray = [];
			if(data != null){
				if(data.brkfstChk == true){
					if(data.brkfstQty == null || !angular.isNumber(data.brkfstQty)){
						errorArray.push("Breakfast Qty");
					}
					if(data.brkfstAvailabilty == null || data.brkfstAvailabilty.length == 0){
						errorArray.push("Breakfast Availability");
					}
				}
				
				if(data.lunchChk == true){
					if(data.lunchQty == null || !angular.isNumber(data.lunchQty)){
						errorArray.push("Lunch Qty");
					}
					if(data.lunchAvailabilty == null || data.lunchAvailabilty.length == 0){
						errorArray.push("Lunch Availability");
					}
				}
				
				if(data.dinnerChk == true){
					if(data.dinnerQty == null || !angular.isNumber(data.dinnerQty)){
						errorArray.push("Dinner Qty");
					}
					if(data.dinnerAvailabilty == null || data.dinnerAvailabilty.length == 0){
						errorArray.push("Dinner Availability");
					}
				}
				
				if(data.baggedChk == true){
					if(data.baggedQty == null || !angular.isNumber(data.baggedQty)){
						errorArray.push("Bagged Qty");
					}
				}
				
				if(!angular.isNumber(data.giftCard)){
					errorArray.push("Gift Card");
				}
				
				if(!angular.isNumber(data.giftCard)){
					errorArray.push("Other");
				}
				
				if(data.monthlyBudget == null){
					errorArray.push("Monthly Budget");
				}
				
				if(data.operatingCost == null){
					errorArray.push("Operating Cost");
				}
				
				if(data.personalCost == null){
					errorArray.push("Personal Cost");
				}
				
				if(data.volunteerNbr == null || !angular.isNumber(data.volunteerNbr)){
					errorArray.push("Volunteer Number");
				}
				
				if(data.foodStamp == null){
					errorArray.push("Food Stamp");
				}
				
				if(data.foodBankSelect == null){
					errorArray.push("Food Bank Select");
				}
				
				if(data.foodBankSelect == true){
					if(data.foodBankValue == null || data.foodBankValue.length == 0)
						errorArray.push("Food Name");
				}
				
				if(data.resource == null || data.resource.length == 0)
					errorArray.push("Resource");
			}	
			else{
				errorArray.push({field : "Services Tab", value : "Empty"});
				}
			errorJson = errorArray;
			return errorJson;
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
			var errorJson = {};
			var errorArray = [];

			if(data != null){
				if(data.individualsServedDaily == null || !angular.isNumber(data.individualsServedDaily)){
					errorArray.push("Individuals Served Daily");
				}
				if(data.individualsServedMonthly == null || !angular.isNumber(data.individualsServedMonthly)){
					errorArray.push("Individuals Served Monthly");
				}
				if(data.individualsServedAnnually == null || !angular.isNumber(data.individualsServedAnnually)){
					errorArray.push("Individuals Served Annually");
				}
				if(data.individualClientInfoCollected == null){
					errorArray.push("Client info collected");
				}
				if(data.individualClientInfoCollected == true){
					if(data.storeClientInfo == null){
						errorArray.push("Store Client Info");
					}
				}
				if(data.unshelteredClientPercentage == null || !angular.isNumber(data.unshelteredClientPercentage)){
					errorArray.push("Unsheltered Clients");
				}
				if(data.employeedClientPercentage == null || !angular.isNumber(data.employeedClientPercentage)){
					errorArray.push("Clients Employed");
				}
		}else{
			errorArray.push({field : "Client Tab", value : "Empty"});
		}
			errorJson = errorArray;
			return errorJson;
		}
	}
})();