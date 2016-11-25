(function() {
    angular
        .module('app')
        .factory('externalAuthService', externalAuthService);

    externalAuthService.$inject = ['$window', '$interval', '$q'];

    function externalAuthService($window, $interval, $q) {
        let origin = $window.location.origin;

        let google = {
            authUrl: 'https://accounts.google.com/o/oauth2/v2/auth?',
            scope: 'email%20profile',
            responseType: 'token',
            clientId: '567741740801-nq7pm00785quslevgntd4et58usf3ufh.apps.googleusercontent.com',
            windowWidth: 452,
            windowHeight: 633
        };

        return {
            googleAuthenticate
        };

        function googleAuthenticate() {
            let windowUrl = `${google.authUrl}scope=${google.scope}&redirect_uri=${origin}&response_type=${google.responseType}&client_id=${google.clientId}`;
            let top = $window.screenY + (($window.outerHeight - google.windowHeight) / 2.5);
            let left = $window.screenX + (($window.outerWidth - google.windowWidth) / 2);
            let windowProperties = `width=${google.windowWidth},height=${google.windowHeight}`;
            let newWindow = $window.open(windowUrl, "", windowProperties);

            newWindow.moveTo(left, top);

            return $q((resolve, reject) => {
                let authInterval = $interval(() => {
                    try {
                        if(newWindow.closed) {
                            $interval.cancel(authInterval);
                        }
                        else if (newWindow.document.URL.indexOf(origin) != -1 && newWindow.document.URL.indexOf('access_token') != -1) {
                            let queryString = newWindow.document.URL.replace('#', '').replace(origin, '').replace('/', '');

                            $interval.cancel(authInterval);
                            newWindow.close();
                            resolve(parseUrl(queryString));
                        }
                    } catch(error) {}
                }, 200);
            });
        }

        function parseUrl(queryString) {
            let params = {};
            let regex = /([^&=]+)=([^&]*)/g, m;

            while (m = regex.exec(queryString)) {
                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }

            return params;
        }
    }
})();