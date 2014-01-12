//called after the platform has completly loaded. all app configs must go at the bottom of
// index.html
//this is how you define the layout of your app
//see $stateProvider in the angular documentation
(function(app){

    //configure solitare platform with ui states
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider,   $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");  //unknown url, goto home

            var configs = app.getConfigs();

            for(var i = 0; i < configs.length; i++){
                $stateProvider.state(configs[i].name, configs[i].config);
            }

        }
    ]);

})(solitare);
