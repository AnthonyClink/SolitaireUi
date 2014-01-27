//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        gameBoard;

    var GameController = function($scope, $state, $log, _, solitaireDataService){
        log = $log;

        var game = solitaireDataService.getGame();

        $scope.game = game;
        $scope.drawPile = game.getPile('DRAW');
        $scope.discardPile = game.getPile('DISCARD');
        $scope.drawCard = game.drawCard;
        $scope.resetDrawPile = game.resetDrawDeck;
        $scope.moveTopCardToResolutionPile = game.moveTopCardToResolutionPile;
    };
	
    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$state', '$log', '_', 'solitaireDataService', GameController]);

//pass in the solitare platform namespace to the closure
})(solitaire);