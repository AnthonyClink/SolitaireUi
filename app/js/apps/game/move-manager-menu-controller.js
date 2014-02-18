(function(app){
    var MoveManagerMenuController = function($scope, moveManager){

        $scope.moveManager = moveManager;

    };
    app.controller('moveManagerMenuController', ['$scope', 'moveManager', MoveManagerMenuController]);
})(solitaire);