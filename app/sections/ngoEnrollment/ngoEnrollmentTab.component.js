(function () {
  angular
      .module('app')
      .component('ngoEnrollmentTab',{
          bindings: {

          },
          templateUrl: 'ngoEnrollmentTab.tpl.html',
          controller: ngoEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  ngoEnrollmentTabController.$inject = ['$q','$rootScope', '$scope','ngoEnrollmentService'];

  function ngoEnrollmentTabController($q,$rootScope, $scope,ngoEnrollmentService) {
      var vm = this;
      vm.tabIndex = 0;
      var overViewData = ngoEnrollmentService.overviewData;
	  var stakeHolderData = ngoEnrollmentService.stakeHolderData;
	  var serviceData = ngoEnrollmentService.serviceData;
	  var fundingData = ngoEnrollmentService.fundingData;
	  var clientData = ngoEnrollmentService.clientData;
	  
      var data1 = {
				 "overview" 	:  {
				        "name": "aleena",
				        "phone": 9456378561,
				        "website": "www.amazon.com",
				        "contact": "antony",
				        "employees": 5,
				        "overview": "online service",
				        "mission": "help others",
				        "promoters": [
				            "xxxx",
				            "yyyy"
				        ]
				    },
		  		 "stakeHolder" 	: {
		  	          "boardMembers": [
		  	              {
		  	                  "name": "sarath",
		  	                  "company": "ust-global"
		  	              }
		  	          ],
		  	          "brandPartners": [
		  	              {
		  	                  "company": "landmark",
		  	                  "phoneNumber": 98763467890
		  	              }
		  	          ],
		  	          "localPartners": [
		  	              {
		  	                  "company": "ust-global",
		  	                  "phoneNumber": 9863245678
		  	              }
		  	          ]
		  	      },
		  		 "service"		: {
		   		    "brkfstChk": true,
		  		    "brkfstQty": 2,
		  		    "lunchChk": true,
		  		    "lunchQty": 1,
		  		    "dinnerChk": true,
		  		    "dinnerQty": 3,
		  		    "baggedChk": true,
		  		    "baggedQty": 1,
		  		    "giftCard": 3,
		  		    "other": "wqer",
		  		    "serviceCalender": {
		  		        "Breakfast": [
		  		            "Sunday","Monday"
		  		        ],
		  		        "Lunch": [
		  		            "Tuesday","Wednesday"
		  		        ],
		  		        "Dinner": [
		  		            "Thursday","Friday"
		  		        ]
		  		    },
		  		    "monthlyBudget": "0-$500",
		  		    "operatingCost": "0-$500",
		  		    "personalCost": "0-$500",
		  		    "volunteerNbr": 3,
		  		    "foodStamp":true,
		  		    "foodBankSelect": true,
		  		    "foodBankValue": [
		  		        "abcd",
		  		        "qwer"
		  		    ],
		  		    "resource": ["Y","X"]
		  		},
		  		 "funding"		: {
		  	        "fundingSource": [
		  	            {
		  	                "source": "source1",
		  	                "amount": 67565
		  	            }
		  	        ],
		  	        "mealDonation": [
		  	            {
		  	                "source": "source2",
		  	                "mealQty": 2,
		  	                "frequency": "qwer"
		  	            }
		  	        ],
		  	        "mealFunding": [
		  	            {
		  	                "source": "source3",
		  	                "amount": 23
		  	            }
		  	        ]
		  	    },
		  		 "client"		: {
		  		        "indServDaily": 2,
		  		        "indServMonthly": 2,
		  		        "indServAnnual": 2,
		  		        "clientInfo": false,
		  		        "clientsUnsheltered": 23,
		  		        "clientsEmployed": 21
		  		    
		    }	  
		  };
      
      ngoEnrollmentService.overviewData = data1.overview;
      ngoEnrollmentService.stakeHolderData =  data1.stakeHolder;
      ngoEnrollmentService.serviceData = data1.service ;
      ngoEnrollmentService.fundingData = data1.funding;
      ngoEnrollmentService.clientData = data1.client;
    
         
     $rootScope.$on("scroll-tab", function(event, data){
    	 vm.scroll()
     });
      vm.scroll = function(){
    	  if(vm.tabIndex ==  4){
    		  vm.tabIndex = 0;
    	  }
    	  else{
    	  ++vm.tabIndex 
    	  }
      }
      
      vm.enrollementData = function(){
    	  debugger;
		  var serviceCalls = ngoEnrollmentService.postNgoEnrollData().then(
					function successCallback(response) {
						if (response
								&& response.data.response
								&& response.data.response == "success") {
							alert("Your request has been submitted")
							$state.go('dashboard');
						} else {
							alert("Failed : "
									+ response.data.errorMsg);
						}
					},
					function errorCallback(response) {
						alert("Something went wrong, please try again")
						// $state.go('dashboard');
					});

	console.log(data);

		  return $q.all(serviceCalls);
		  
	  }
  }
  
})();
        