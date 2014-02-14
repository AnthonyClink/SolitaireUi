//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        _;

    var GameController = function($scope, $log, __, solitaireDataService, clickToMoveHandler, ruleSystem){
        log = $log;
        _ = __;

        info('preparing data manipulation api for use in the ui: ');

        $scope.emptyResolutionPileCSS = app.emptyResolutionPileCSS;

        var game = solitaireDataService.getGame();

        _.forEach(solitaire.PILE_NAMES, function(name){
            info('Prepared data for ' + name + ': ' + _.map(game.getPile(name).getCards(), function(card){
                return '{' + (card.isFaceDown() ? "F-D" : card.getShortName()) + '}';
            }));
        });

        function handleClick(pile, card){
            if(clickToMoveHandler.isInSelectedState()){
                var move = clickToMoveHandler.selectPile(pile, game);
                ruleSystem.processMove(move);
            }else{
                clickToMoveHandler.selectCard(pile, card);
            }
        }

        $scope.clickToMove = handleClick;

        $scope.game = game;
        $scope.drawPile = game.getPile('DRAW');
        $scope.discardPile = game.getPile('DISCARD');

        $scope.drawCard = function(){
            if(clickToMoveHandler.isInSelectedState()){
                clickToMoveHandler.cancelEvent();
            }
            return game.drawCard();
        };

        $scope.resetLibrary = function(){
            if(clickToMoveHandler.isInSelectedState()){
                clickToMoveHandler.cancelEvent();
            }
            return game.resetLibrary();
        };

        $scope.moveTopCardToResolutionPile = game.moveTopCardToResolutionPile;
    };

    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$log', '_', 'solitaireDataService', 'clickToMoveHandler', 'ruleSystem', GameController]);

    //this function is primarily for unit testing purposes. we need to find a better way to do this TODO: fix me
    app.setLoDash = function(__){
        _ = __;
    };

//pass in the solitaire platform namespace to the closure
})(solitaire);
