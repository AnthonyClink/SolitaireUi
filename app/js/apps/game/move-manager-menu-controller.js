(function(app){
    var MoveManagerMenuController = function($scope, moveManager){
        $scope.moveHistory = moveManager.getMoveHistory();
    };
    app.controller('moveManagerMenuController', ['$scope', 'moveManager', MoveManagerMenuController]);
})(solitaire);