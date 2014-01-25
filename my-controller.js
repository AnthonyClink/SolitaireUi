(function(ng){

    var app = ng.module('demo', []);

    var MyController = function($scope){
        $scope.headerTextSize = {
            fontSize:'30px',
            color:'red'
        };
        $scope.listTextSize = {
            fontSize : '19px',
            textDecoration : 'underline'
        };
    };


    app.controller('myController',['$scope', MyController]);

})(angular)