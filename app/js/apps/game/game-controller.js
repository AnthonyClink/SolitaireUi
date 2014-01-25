//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        gameBoard;

    var GameController = function($scope, $state, gameService, $log, _, $resource){
        log = $log;

        $scope.gameBoard = gameService.getGame();

    };
	
    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$state', 'gameService', '$log', '_', '$resource', GameController]);

//pass in the solitare platform namespace to the closure
})(solitaire);