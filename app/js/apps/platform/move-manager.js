(function(app){

    var MoveManager = function(__, dataAccessAPI){
        var moveHistory = [],
            self = {},
            nextIndex = 0;

        self.recordMove = function(move){
            if(move.success && move.getSelectedPile().getType() !== 'DRAW'){
                var historyItem = {moveIndex: ++nextIndex, moveText: createName(move), moveState: dataAccessAPI.copyState(move.getGame())};
                moveHistory.push(historyItem);
            }
            return historyItem;
        };

        self.resetStateTo = function(newMoveHistory){
            moveHistory = newMoveHistory;
        }

        self.getMoveHistory = function(){
            return moveHistory;
        }

        function createName(move){

            var name = '',
                selectedCard = move.getSelectedCard(),
                selectedPile = move.getSelectedPile(),
                associatedCards = move.getAssociatedCards(),
                targetPile = move.getTargetPile();

                if(selectedCard){
                    name += selectedCard.getShortName();
                }else if(associatedCards.length > 0){
                    name += '{';
                    name += _.map(associatedCards, function(card){
                        name += '[' + card.getShortName() + ']';
                    });
                    name += '}';
                }else{
                    name += selectedPile.getName();
                }

                name += ' to ' + targetPile.getName();

            return name;

        }
        return self;
    };

    app.MoveHistory = MoveManager;

    app.factory('moveManager', ['_', 'dataAccessAPI', MoveManager]);
})(solitaire);