//closure to contain state in the solitare namespace.
(function(app){



    var HomeController = function($scope, $state){



    };



	

    //make constructor accessible via the solitare namespace
    app.HomeController = HomeController;

    app.controller('homeController', ['$scope', '$state', HomeController]);

//pass in the solitare platform namespace to the closure
})(solitaire);