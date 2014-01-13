//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ';

    var GameController = function($scope, $state, boardService, $log, _){
        log = $log;
        
        $scope.$on('SOLITAIRE_BOARD_LOADED', function(){
            var gameBoard = boardService.getGameBoard();
		    $scope.gameBoard = gameBoard;
        });

        $scope.dropSuccessHandler = function($event,index,pile){
            info('Drag-Drop processed on ' + pile.getName() + '  at index: ' + index);
            info('       (' + _.map(pile.getCards(), function(card){return card.shortName}) + ')');
        };

        $scope.onDrop = function($event,$data,pile){
            info('Drop processing on card: ' + $data.longName);
            info('    Target pile: ' + pile.getName() +' (' + _.map(pile.getCards(), function(card){return card.shortName}) + ')');
        };
    };
	
    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$state', 'boardService', '$log', '_', GameController]);

//pass in the solitare platform namespace to the closure
})(solitaire);