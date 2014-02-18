(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        _,
        game;

    var GameController = function($scope, $log, __, solitaireDataService, clickToMoveHandler, ruleSystem, moveManager){
        log = $log;
        _ = __;

        var self = {};

        info('preparing data manipulation api for use in the ui: ');
        game = solitaireDataService.createGame();

        $scope.game = game;

        $scope.emptyResolutionPileCSS = app.emptyResolutionPileCSS;

        self.handleClick = function(pile, card){
            if(clickToMoveHandler.isInSelectedState()){
                var move = clickToMoveHandler.selectPile(pile, game);
                if(move.getTargetPile().getType() === 'DISCARD' && move.getSelectedPile().getType() !== 'DRAW'){
                    clickToMoveHandler.cancelEvent();
                }else{
                    ruleSystem.processMove(move);
                    if(move.success){
                        $scope.moveHistory = moveManager.getMoveHistory();
                    }
                    clickToMoveHandler.cancelEvent();
                }
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

        $scope.getMoveHistory = moveManager.getMoveHistory;

        return self;
    };

    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitaire namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$log', '_', 'solitaireDataService', 'clickToMoveHandler', 'ruleSystem', 'moveManager', GameController]);

    //this function is primarily for unit testing purposes. we need to find a better way to do this TODO: fix me
    app.setLoDash = function(__){
        _ = __;
    };

})(solitaire);
