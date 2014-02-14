(function(app){

    var Move = function(moveData){

        var localGame = moveData.game;

        var processMove = function(move, game){

            var selectedCards = move.getAssociatedCards(),
                targetPile = move.getTargetPile();

            for(var i = 0; i < selectedCards.length; i++){

                var selectedCard = selectedCards[i];

                move.getSelectedPile().removeCard(selectedCard);

                var targetPileType = move.getTargetPile().getName().split('_');

                if(targetPileType.length > 0 && targetPileType[0] === 'RESOLUTION'){
                    var aPile = game.getPile('RESOLUTION_' + selectedCard.getSuit());
                    aPile.addCard(selectedCard);
                }else{
                    targetPile.addCard(selectedCard);
                }
            }

            var topCard = move.getSelectedPile().getTopCard();

            if(topCard.isFaceDown()){
                topCard.turnFaceUp();
            }
        };

        var self = {};


        self.getSelectedCard = app.createGetter(moveData.selectedCard);
        self.getSelectedPile = app.createGetter(moveData.selectedPile);
        self.getAssociatedCards = app.createGetter(moveData.associatedCards);
        self.getTargetPile = app.createGetter(moveData.targetPile);
        self.getGame = app.createGetter(localGame);
        self.doMove = function(){return processMove(self, localGame)};

        return self;
    };

    var ClickToMoveHandler = function(_){

        var self = {},
            currentMoveData = null;

        self.initializeMoveData = function(moveData){
            currentMoveData = moveData;
        }

        self.createMove = function(moveData){
            return new Move(moveData);
        };

        self.isInSelectedState = function(){
            return currentMoveData !== null;
        };

        self.selectCard = function(pile, card){

            if(!card || card.getRank() === 'BLANK'){
                return null;
            }

            var selectedCards = [];

            var pileCards = pile.getCards();

            var cardIndex = _.indexOf(pileCards, card);

            for(var i = cardIndex; i < pileCards.length; i++){

                selectedCards.push(pileCards[i]);

            }

            var moveData = {};

            currentMoveData = moveData;

            moveData.selectedCard = card;
            moveData.associatedCards = selectedCards;
            moveData.selectedPile = pile;
            return moveData;
        };

        self.selectPile = function(targetPile, game){

            if(currentMoveData == null){
                throw Error("You must select a card before you can attempt to move it!");
            }

            var moveData = currentMoveData;
            moveData.game = game;
            moveData.targetPile = targetPile;
            currentMoveData = null;

            return self.createMove(moveData);

        };

        self.getCurrentMoveData = function(){
            return currentMoveData;
        };

        self.cancelEvent = function(){
            currentMoveData = null;
        };

        return self;
    };

    app.Move = Move;
    app.ClickToMoveHandler = ClickToMoveHandler;
    app.factory('clickToMoveHandler', ['_', ClickToMoveHandler]);
})(solitaire);