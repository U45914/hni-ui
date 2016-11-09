(function() {
    angular
        .module('app')
        .component('landingNgo', {
            bindings: {},
            templateUrl: 'landing-ngo.tpl.html',
            controller: LandingNgoController,
            controllerAs: 'vm'
        });

    function LandingNgoController() {
        var vm = this;

        vm.ngos = [
            {
                name: "NWA Women's Shelter",
                imagePath: "/app/assets/images/landing/nwa_womens_shelter.png"
            },
            {
                name: "Samaritan Community Center",
                imagePath: "/app/assets/images/landing/samaritan.png"
            },
            {
                name: "Teen Action & Support Center",
                imagePath: "/app/assets/images/landing/tasc_logo.png"
            },
            {
                name: "7hills",
                imagePath: "/app/assets/images/landing/7hills_logo.png"
            },
            {
                name: "Care Community Center",
                imagePath: "/app/assets/images/landing/care_logo.png"
            },
            {
                name: "Genesis House",
                imagePath: "/app/assets/images/landing/genesis_house_logo.png"
            },
            {
                name: "The Manna Center",
                imagePath: "/app/assets/images/landing/manna_center_logo.png"
            },
        ];
    }
})();