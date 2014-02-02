//create the namespace v
var solitaire = (function(ng){

    var configs = [];

    var getConfigs = function(){
        return configs;
    };

    //takes in a name and a view configuration. convience function for your apps
    var addUiRouteConfiguration = function(uiRouteConfiguration){
        configs.push(uiRouteConfiguration);
    };

    var ui = ng.module("solitaire.platform", ['ngResource', 'ui.bootstrap', 'ui.router', 'ngDragDrop']).
        run(['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }]);

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
    ui.getConfigs = getConfigs;

    ui.capFirstLetter = function(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return ui;
//pass angular into the nikePlatform namespace
})(angular);