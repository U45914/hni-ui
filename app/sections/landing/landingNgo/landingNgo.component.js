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
                imagePath: require("images/landing/nwa_womens_shelter.png")
            },
            {
                name: "Samaritan Community Center",
                imagePath: require("images/landing/samaritan.png")
            },
            {
                name: "Teen Action & Support Center",
                imagePath: require("images/landing/tasc_logo.png")
            },
            {
                name: "7hills",
                imagePath: require("images/landing/7hills_logo.png")
            },
            {
                name: "Care Community Center",
                imagePath: require("images/landing/care_logo.png")
            },
            {
                name: "Genesis House",
                imagePath: require("images/landing/genesis_house_logo.png")
            },
            {
                name: "The Manna Center",
                imagePath: require("images/landing/manna_center_logo.png")
            },
            {
                name: "Covenant House",
                imagePath: require("images/landing/covenant_house.png")
            },
            {
                name: "S.P.Y.",
                imagePath: require("images/landing/spy.png")
            }
        ];
    }
})();