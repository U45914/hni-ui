/**
 * 
 */

(function() {
	angular.module('app').controller('sendMessageController', sendMessageController);
	sendMessageController.$inject = ['dataList', 'messageService', '$mdDialog'];

	function sendMessageController(dataList, messageService, $mdDialog) {
		var sm = this;
		var totalCharacters = 0;
		sm.userId = dataList;
		sm.isDisabled = true;
		sm.buttonText = "Send";
		sm.isClose = false;
		sm.reports = false;
		sm.isShowReport = false;
		
		sm.submit = function(){
			sm.buttonText = "Sending";
			var data = {
					userId : sm.userId,
					message : sm.message
			}
			messageService.sendMessage(data).then(function(response){
				if(response != null){
					sm.isClose = true;
					sm.reports = true;
					sm.totalSuccess = response.data.totalSuccess;
					sm.totalFailed = response.data.totalFailed;
					sm.statusReport = response.data.details;
				}
			});
		}
		
		sm.close = function(){
			$mdDialog.hide();
		}
	
		sm.viewReports = function(){
			sm.isShowReport = true;
		}
		
		sm.sendButtonEnable = function(){
			var messageLength = (sm.message+'').length ;
			if(messageLength > 0){
				sm.isDisabled = false;
			} else {
				sm.isDisabled = true;
			}
			
		}
	}

})();