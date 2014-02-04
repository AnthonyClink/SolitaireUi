//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        _;

    var ClickToMoveHandler = function(scope, game){

        var self = {};
        var selectedState = false;

        scope.selectedCard = null;

        self.isCardSelected = function(){
            return selectedState;
        };

        scope.inSelectedState = self.isCardSelected;

        self.selectCard = function(pile, card){

            if(!card || card.getRank() === 'BLANK'){
                return;
            }

            var selectedCards = [];

            var pileCards = pile.getCards();

            var cardIndex = _.indexOf(pileCards, card);

            for(var i = cardIndex; i < pileCards.length; i++){

                selectedCards.push(pileCards[i]);

            }


            scope.selectedCard = card;
            scope.associatedCards = selectedCards;

            selectedState = true;

            scope.selectedPile = pile;
        };

        self.selectPile = function(targetPile){

            var selectedCards = scope.associatedCards;

            for(var i = 0; i < selectedCards.length; i++){

                var selectedCard = selectedCards[i];

                scope.selectedPile.removeCard(selectedCard);

                var targetPileType = targetPile.getName().split('_');

                if(targetPileType.length > 0 && targetPileType[0] === 'RESOLUTION'){
                    var aPile = game.getPile('RESOLUTION_' + selectedCard.getSuit());
                    aPile.addCard(selectedCard);
                }else{
                    targetPile.addCard(selectedCard);
                }




            }

            selectedState = false;
            scope.selectedCard = null;
            scope.selectedPile = null;

        };

        self.cancelEvent = function(){
            selectedState = false;
            scope.selectedCard = null;
            scope.selectedPile = null;
        };

        self.selectedState = selectedState;

        return self;
    };

    var GameController = function($scope, $log, __, solitaireDataService){
        log = $log;
        _ = __;

        info('preparing data manipulation api for use in the ui: ');

        game = solitaireDataService.getGame();
        var clickToMoveHandler = new ClickToMoveHandler($scope, game);

        _.forEach(solitaire.PILE_NAMES, function(name){
            info('Prepared data for ' + name + ': ' + _.map(game.getPile(name).getCards(), function(card){
                return '{' + (card.isFaceDown() ? "F-D" : card.getShortName()) + '}';
            }));
        });

        function handleClick(pile, card){
            if(clickToMoveHandler.isCardSelected()){
                clickToMoveHandler.selectPile(pile);
            }else{
                clickToMoveHandler.selectCard(pile, card);
            }
        }

        $scope.clickToMove = handleClick;

        $scope.game = game;
        $scope.drawPile = game.getPile('DRAW');
        $scope.discardPile = game.getPile('DISCARD');

        $scope.drawCard = function(){
            if(clickToMoveHandler.isCardSelected()){
                clickToMoveHandler.cancelEvent();
            }
            return game.drawCard();
        };

        $scope.resetLibrary = function(){
            if(clickToMoveHandler.isCardSelected()){
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
    app.ClickToMoveHandler = ClickToMoveHandler;
    app.controller('gameController', ['$scope', '$log', '_', 'solitaireDataService', GameController]);

    //this function is primarlarly for unit testing purposes. we need to find a better way to do this TODO: fix me
    app.setLoDash = function(__){
        _ = __;
    }

//pass in the solitare platform namespace to the closure
})(solitaire);
