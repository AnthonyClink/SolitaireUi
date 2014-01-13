//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        gameBoard;

    var GameController = function($scope, $state, boardService, $log, _){
        log = $log;
        
        $scope.$on('SOLITAIRE_BOARD_LOADED', function(){
            gameBoard = boardService.getGameBoard();
		    $scope.gameBoard = gameBoard;
            refreshPlayArea();
        });

        $scope.dropSuccessHandler = function($event,index,pile){
            info('Deleting card in ' + pile.getName() + '  at index: ' + index);
            pile.removeCard(index);
            info('    Results: [' + _.map(pile.getCards(), function(card){return card.shortName}) + ']');
            refreshPlayArea();
        };

        $scope.onDrop = function($event,$data,pile){
            info('Adding card ' + $data.longName + " to pile " + pile.getName());
            pile.addCard(new app.Card($data));
            info('    Results: [' + _.map(pile.getCards(), function(card){return card.shortName}) + ']');
            refreshPlayArea();
        };

        function refreshPlayArea(){
            $scope.discardPileTopCard = gameBoard.getDiscardPile().getTopCard();
            $scope.drawPileTopCard = gameBoard.getDrawPile().getTopCard();
            $scope.clubPileTopCard = gameBoard.getClubs().getTopCard();
            $scope.heartPileTopCard = gameBoard.getHearts().getTopCard();
            $scope.spadePileTopCard = gameBoard.getSpades().getTopCard();
            $scope.diamondPileTopCard = gameBoard.getDiamonds().getTopCard();
        }
    };
	
    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$state', 'boardService', '$log', '_', GameController]);

//pass in the solitare platform namespace to the closure
})(solitaire);