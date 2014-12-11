//create the namespace v
var solitaire = (function(ng){

    var configs = [];


    //takes in a name and a view configuration. convience function for your apps
    var addUiRouteConfiguration = function(uiRouteConfiguration){
        configs.push(uiRouteConfiguration);
    };

    var ui = ng.module("solitaire.platform", ['ngResource', 'ui.bootstrap', 'ui.router']);

    ui.isBlankCard = function(card){
        if(!card){
            return true;
        }
        return card.getRank() === 'BLANK';
    };

    ui.isFaceDown = function(card){
        return card.isFaceDown();
    };

    //expose helper functions to namespace
    ui.addUiRouteConfiguration = addUiRouteConfiguration;

    ui.capFirstLetter = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    ui.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");  //unknown url, goto home
            for(var i = 0; i < configs.length; i++){
                $stateProvider.state(configs[i].name, configs[i].config);
            }
        }
    ])
    .run(['$rootScope', '$state', '$stateParams',
        function ($rootScope,   $state,   $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.getCurrentStateName = function(){return $state.current.name};
        }
    ]);

    return ui;
//pass angular into the namespace
})(angular);
