(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$httpProvider', '$authProvider'];

    function config($httpProvider, $authProvider) {
        $authProvider.httpInterceptor = false;

        $authProvider.google({
            clientId: '567741740801-nq7pm00785quslevgntd4et58usf3ufh.apps.googleusercontent.com',
            responseType: 'token'
        });

        $authProvider.google({
            url: '/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin,
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            display: 'popup',
            oauthType: '2.0',
            popupOptions: { width: 452, height: 633 }
        });

        $httpProvider.interceptors.push('interceptorService');
    }
})();