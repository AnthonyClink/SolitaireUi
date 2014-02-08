(function(app){

    var ClickToMoveHandler = function(_){

        var self = {},
            currentMove = null;

        var createMove = function(){
            return {};
        };

        self.createMove = function(){
            currentMove = createMove();
            return currentMove;
        };

        self.isInSelectedState = function(){
            return currentMove !== null;
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

            var move = createMove();

            currentMove = move;

            move.selectedCard = card;
            move.associatedCards = selectedCards;



            move.selectedPile = pile;
            return move;
        };

        self.selectPile = function(targetPile, game){

            if(currentMove == null){
                throw Error("You must select a card before you can attempt to move it!");
            }

            var selectedCards = currentMove.associatedCards;

            for(var i = 0; i < selectedCards.length; i++){

                var selectedCard = selectedCards[i];

                currentMove.selectedPile.removeCard(selectedCard);

                var targetPileType = targetPile.getName().split('_');

                if(targetPileType.length > 0 && targetPileType[0] === 'RESOLUTION'){
                    var aPile = game.getPile('RESOLUTION_' + selectedCard.getSuit());
                    aPile.addCard(selectedCard);
                }else{
                    targetPile.addCard(selectedCard);
                }

            }

            var topCard = currentMove.selectedPile.getTopCard();

            if(topCard.isFaceDown()){
                topCard.turnFaceUp();
            }

            var move = currentMove;
            currentMove = null;

            return move;

        };

        self.getCurrentMove = function(){
            return currentMove;
        };

        self.cancelEvent = function(){
            currentMove = null;
        };

        return self;
    };

    app.ClickToMoveHandler = ClickToMoveHandler;
    app.factory('clickToMoveHandler', ['_', ClickToMoveHandler]);
})(solitaire);