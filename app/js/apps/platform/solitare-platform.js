//create the namespace v
var solitare = (function(ng){

    var configs = [];

    var getConfigs = function(){
        return configs;
    }

    //takes in a name and a view configuration. convience function for your apps
    var addUiRouteConfiguration = function(uiRouteConfiguration){
        configs.push(uiRouteConfiguration);
    }

    var ui = ng.module("solitare.platform", ['ngResource', 'ui.bootstrap', 'ui.router']).
        run(['$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }]);

    //expose helper functions to namespace
    ui.addUiRouteConfiguration = addUiRouteConfiguration;
    ui.getConfigs = getConfigs;

    return ui;
//pass angular into the nikePlatform namespace
})(angular);