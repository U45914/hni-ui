(function() {
    angular
        .module('app')
        .component('landingDonate', {
            bindings: {},
            templateUrl: 'landing-donate.tpl.html',
            controller: LandingDonateController,
            controllerAs: 'vm'
        });

    function LandingDonateController() {
        var vm = this;
        
        window.bboxInit = function () {
           bbox.showForm('5caf7b51-d57e-439e-be9b-4cd9da32ba10');
       };

        var e = document.createElement('script'); e.async = true;
        e.src = 'https://bbox.blackbaudhosting.com/webforms/bbox-min.js';
        document.getElementsByTagName('head')[0].appendChild(e);
    }
})();