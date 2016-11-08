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
                imagePath: "/Content/"
            },
            {
                name: "Teen Action & Support Center",
                imagePath: "/Content/"
            },
            {
                name: "7hills",
                imagePath: "/Content/"
            },
            {
                name: "Care Community Center",
                imagePath: "/Content/"
            },
            {
                name: "Genesis House",
                imagePath: "/Content/"
            },
            {
                name: "The Manna Center",
                imagePath: "/Content/"
            },
        ];
    }
})();