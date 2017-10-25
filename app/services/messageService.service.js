(function(){
	angular.module('app')
			.service('messageService',messageService);
	
	messageService.$inject = ['$http', 'serviceConstants'];
	
	function messageService($http, serviceConstants){
		let baseUrl = serviceConstants.baseUrl;
		
		return{
			sendMessage
		};
		
		function sendMessage(data){
			return $http.post(`${baseUrl}/usermessage/custom/`, data);
		}
	}
})();