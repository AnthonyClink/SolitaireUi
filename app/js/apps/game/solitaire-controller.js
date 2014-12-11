(function(app){

    var log;


    var GameController = function($scope, $log, solitaireDataService, clickToMoveHandler, ruleSystem, moveManager){

        var self = this;
        log = $log;

        info('preparing data manipulation api for use in the ui: ');
        moveManager.reset();

        var game = solitaireDataService.createGame();

        $scope.game = game;

        $scope.emptyResolutionPileCSS = app.emptyResolutionPileCSS;

        self.handleClick = function(pile, card){
            if(clickToMoveHandler.isInSelectedState()){
                var move = clickToMoveHandler.selectPile(pile, game);
                if(move.getTargetPile().getType() === 'DISCARD' && move.getSelectedPile().getType() !== 'DRAW'){
                    clickToMoveHandler.cancelEvent();
                }else{
                    ruleSystem.processMove(move);
                    clickToMoveHandler.cancelEvent();
                }
            }else{
                var data = clickToMoveHandler.selectCard(pile, card);
                for(card in data.associatedCards){
                    $scope.$broadcast('selected');
                }
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
        log.info("GameController:  " + message);
    }

    //make constructor accessible via the solitaire namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$log', 'solitaireDataService', 'clickToMoveHandler', 'ruleSystem', 'moveManager', GameController]);

})(solitaire);
