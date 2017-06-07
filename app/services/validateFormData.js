(function(){
	angular
		.module('app')
		.service('validateFormData',validateFormData);
	
	validateFormData.$inject = [];
	
	function validateFormData(){
			return{
				validate
			};
			
			
		function validate(type, id, value, event){
			var fields = {};
			var msgs = {};
			if(value != null && value != ""){
				fields[id] = false;
				switch(type){
					case "number" :  
									 return validateNumber(fields, msgs, id, value, event);
					case "text"	  :  
									 return validateText(fields, msgs, id, value, event); 
					case "url"    : 
									 return validateUrl(fields, msgs, id, value, event);
					case "password" :
									 return validatePassword(fields, msgs, id, value, event);
				}
			}else if(id == "zip" || id =="bday"){
				fields[id] = false;
				msgs[id]="";
				return {
					"field" : fields,
					"msg"   : msgs
					};
			}
			else{
				fields[id] = true;
				msgs[id] = "Please fill this field"; 
				if(id=="email"||id=="website"){
					if (event.target.value != "" && value == null) {
						fields[id] = true;
						msgs[id]="Invalid Format";
					} else {
						fields[id] = true;
						msgs[id]="Please fill this field";
					}
				}
				return {
					"field" : fields,
					"msg"   : msgs
					};
			}
		}
		
		function validateUrl(fields, msgs, id, value, event){
			if(id=="email"||id=="website"){
				var url = value;
				var patt = new RegExp("(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9-@:%._\+~#=]+\.[^\s]{2,}|(?:www\.)[a-zA-Z0-9-@:%._\+~#=]+\.[^\s]{2,})");
				var res = patt.test(url);
				if (res != true) {
					fields[id] = true;
					msgs[id] = "Invalid Url format";
				} else {
					fields[id] = false;
				}
			return {
				"field" : fields,
				"msg"   : msgs
				};
		}
		}
		function validateText(fields, msgs, id, value, event){
			fields[id] = false;
			return {
				"field" : fields,
				"msg"   : msgs
				};
			
		}
		function validateNumber(fields, msgs, id, value, event){
			if(id=="zip"){
				if(value != null){
				var zip = value;
				if (isNaN(Number(zip))|| (zip.length != 5) || zip.indexOf("-")!=-1) {
					fields[id] = true;
					msgs[id]="Invalid Zip Code";
				}else{
					fields[id]=false;
				}
				}
			}
			if(id=="fte"){
				var fte = value;
				if (isNaN(Number(fte)) ||  fte < 0) {
					fields[id] = true;
					msgs[id]="Invalid Employee";
				}else{
					fields[id]=false;
				}
			}
			if(id=="phone"){
				var phone = value;
				var patt = new RegExp("((([0-9]{3})(-{1}[0-9]{3})(-{1}[0-9]{4}))|([0-9]{10}))");
				var res = patt.test(phone);
				if (res != true || isNaN(Number(value.replace(/-/g, "")))) {
						fields[id] = true;
						msgs[id] = "Phone number (eg:'123-456-7890')";
				} else{
					fields[id] = false;
				}
			}
			if(id=="brkfstQty" || id == "lunchQty" || id=="dinnerQty" || id == "volunteerNbr" || id == "amount" ){
				var qty = value;
				if (isNaN(Number(qty)) || qty < 0) {
					fields[id] = true;
					msgs[id] = "Invalid Number";
				}else{
					fields[id] = false;
				}
			}
			
			return {
				"field" : fields,
				"msg"   : msgs
				};
		}
		
		function validatePassword(fields, msgs, id, value, event){
			if(id == "confirmPassword" && (value != event)){
				fields[id] = true;
				msgs[id] = "Password Mismatch";
			}else if(id == "confirmPassword" && (value == event)){
				fields[id] = false;
			}
			if(id == "password"){
				var value = vm.password;
				var specialChar = /^[a-zA-Z0-9- ]*$/;
				var alphabets = /[a-z]/i;
				var number = /\d+/g;
				if (!specialChar.test(value) && number.test(value) && alphabets.test(value) && value.length>=6) {
					fields[id] = false;
				} else {
					fields[id] = true;
				}
			}
			return {
				"field" : fields,
				"msg"   : msgs
				};
		}
		
	}
})();