//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        _,
        game;

    var GameController = function($scope, $log, __, solitaireDataService, clickToMoveHandler, ruleSystem){
        log = $log;
        _ = __;

        var self = {};

        info('preparing data manipulation api for use in the ui: ');
        $scope.game;
        $scope.clickToMove;
        $scope.moveTopCardToResolutionPile;

        game = solitaireDataService.createGame();

        $scope.game = game;

        $scope.emptyResolutionPileCSS = app.emptyResolutionPileCSS;

        self.handleClick = function(pile, card){
            if(clickToMoveHandler.isInSelectedState()){
                var move = clickToMoveHandler.selectPile(pile, game);
                ruleSystem.processMove(move);
            }else{
                clickToMoveHandler.selectCard(pile, card);
            }
        };

        $scope.clickToMove = self.handleClick;

        $scope.drawCard = function(){
            if(clickToMoveHandler.isInSelectedState()){
                clickToMoveHandler.cancelEvent();
            }
            self.handleClick(game.getDrawPile(), undefined);
            self.handleClick(game.getDiscardPile(), undefined);
        };

        $scope.resetLibrary = function(){
            if(clickToMoveHandler.isInSelectedState()){
                clickToMoveHandler.cancelEvent();
            }
            return game.resetLibrary();
        };

        $scope.moveTopCardToResolutionPile = game.moveTopCardToResolutionPile;

        return self;
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
