(function() {
    angular
        .module('app')
        .factory('giftCardService', giftCardService);

    giftCardService.$inject = ['$http','serviceConstants'];

    function giftCardService($http,serviceConstants) {
    	let baseUrl = serviceConstants.baseUrl;
        return {
        	getProviderGiftCards,
        	saveNewGiftCard,
        	deleteGiftCard,
        	updateGiftCards
        };

        function getProviderGiftCards(providerId) {
        	return $http.get(`${baseUrl}/giftCards/${providerId}/provider/`);
        }    
        
        function saveNewGiftCard(giftCard){
        	return $http.post(`${baseUrl}/giftCards/save/`, giftCard);
        }
        function deleteGiftCard(giftCardId){
        	return $http.delete(`${baseUrl}/giftCards/${giftCardId}/delete/`);
        }
        function updateGiftCards(giftCards){
        	return $http.put(`${baseUrl}/giftCards/cards/update`,giftCards);
        }
    }
})();