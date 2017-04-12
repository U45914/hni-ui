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
				        "name": "uyygt",
				        "phone": 68767868,
				        "website": "jhghjg",
				        "contact": "hgghjg",
				        "employees": 5,
				        "overview": "jhyghg",
				        "mission": "jhgjhg",
				        "promoters": [
				            "jhghjg",
				            "uygg"
				        ]
				    },
		  		 "stakeHolder" 	: {
		  	          "boardMembers": [
		  	              {
		  	                  "name": "iuyuyiuy",
		  	                  "company": "uyyiy"
		  	              }
		  	          ],
		  	          "brandPartners": [
		  	              {
		  	                  "company": "uytyt",
		  	                  "phoneNumber": 876
		  	              }
		  	          ],
		  	          "localPartners": [
		  	              {
		  	                  "company": "ygyug",
		  	                  "phoneNumber": 7678
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
		  		        "Sunday": [
		  		            "Breakfast"
		  		        ],
		  		        "Monday": [
		  		            "Breakfast"
		  		        ],
		  		        "Tuesday": [
		  		            "Lunch"
		  		        ],
		  		        "Wednesday": [
		  		            "Lunch"
		  		        ],
		  		        "Thursday": [
		  		            "Dinner"
		  		        ],
		  		        "Friday": [
		  		            "Dinner"
		  		        ]
		  		    },
		  		    "monthlyBudget": "0-$500",
		  		    "operatingCost": "0-$500",
		  		    "personnelCost": "0-$500",
		  		    "volunteerNbr": 3,
		  		    "foodBankSelect": true,
		  		    "foodBankValue": [
		  		        "wer",
		  		        "wewer"
		  		    ],
		  		    "resource": ["Y","X"]
		  		},
		  		 "funding"		: {
		  	        "fundingSource": [
		  	            {
		  	                "source": "ygyg",
		  	                "amount": 67565
		  	            }
		  	        ],
		  	        "mealDonation": [
		  	            {
		  	                "source": "htfthf",
		  	                "mealQty": 2,
		  	                "frequency": "gfhgf"
		  	            }
		  	        ],
		  	        "mealFunding": [
		  	            {
		  	                "source": "tftyf",
		  	                "amount": 23
		  	            }
		  	        ]
		  	    },
		  		 "client"		: {
		  		        "individualsServedDaily": 2,
		  		        "individualsServedMonthly": 2,
		  		        "individualsServedAnnually": 2,
		  		        "individualClientInfoCollected": false,
		  		        "unshelteredClientPercentage": 23,
		  		        "employeedClientPercentage": 21
		  		    
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
		  var data = {
				 "overview" 	: overViewData,
		  		 "stakeHolder" 	: stakeHolderData,
		  		 "service"		: serviceData,
		  		 "funding"		: fundingData,
		  		 "client"		: clientData	  
		  };
		  var serviceCalls = ngoEnrollmentService.postNgoEnrollData(data);
		  return $q.all(serviceCalls);
		  
	  }
  }
  
})();
        