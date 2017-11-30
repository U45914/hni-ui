(function() {
	angular.module('app').controller('rechargeGiftCardController',
			rechargeGiftCardController);

	rechargeGiftCardController.$inject = [ '$scope', 'giftCard', 'giftCardService', 'validateService', 'toastService', '$mdDialog'];

	function rechargeGiftCardController($scope, giftCard, giftCardService, validateService, toastService, $mdDialog) {
		let rcc = this;
		rcc.giftCard = [];
		rcc.states = validateService.validateStateDrpdwn();
		
		giftCardService.getGiftCard(giftCard).then(function(response){
			
			var dataFromServer = response.data.data; 

			rcc.giftCard.id = dataFromServer.id;
			rcc.giftCard.cardNumber = dataFromServer.cardNumber; 
			rcc.giftCard.cardSerialId = dataFromServer.cardSerialId;
			rcc.giftCard.stateCode = convertStateCode(dataFromServer.stateCode);
		});
		
		rcc.recharge = function(){
			giftCardService.rechargeGiftCard(rcc.giftCard).then(function(response){
				if(response.data.message=="success"){
					$mdDialog.hide();
				}
				toastService.showToast(response.data.data);
				
			});
		}
		
		function convertStateCode(stateCode){
			for(var index=0; index < rcc.states.length; index++){
				if(stateCode == null || rcc.states[index]==null ){
					return "";
				}
				if(stateCode == rcc.states[index].value){
					return rcc.states[index].name;	
				}
			}
		}
	}
	
})();