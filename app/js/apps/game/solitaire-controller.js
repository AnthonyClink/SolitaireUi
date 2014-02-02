//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        _;

    var ClickToMoveHandler = function(scope){

        var self = {};
        var selectedState = false;

        scope.selectedCard = null;

        scope.inSelectedState = function(){
            return selectedState;
        };

        self.selectCard = function(pile, card){
            scope.selectedCard = card;
            selectedState = true;
            scope.selectedPile = pile;
        };

        self.selectPile = function(targetPile){
            var selectedPileCards =  scope.selectedPile.getCards();
            var cardIndex = _.indexOf(selectedPileCards, scope.selectedCard);
            var selectedCards = [];
            for(var i = cardIndex; i < selectedPileCards.length; i++){
                selectedCards.push(selectedPileCards[i]);
            }
            for(var i = 0; i < selectedCards.length; i++){

                scope.selectedPile.removeCard(selectedCards[i]);
                targetPile.addCard(selectedCards[i]);
            }

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

        var clickToMoveHandler = new ClickToMoveHandler($scope);

        info('preparing data manipulation api for use in the ui: ');
        var game = solitaireDataService.getGame();
        _.forEach(solitaire.PILE_NAMES, function(name){
            info('Prepared data for ' + name + ': ' + _.map(game.getPile(name).getCards(), function(card){
                return '{' + (card.isFaceDown() ? "F-D" : card.getShortName()) + '}';
            }));
        });

        $scope.game = game;
        $scope.drawPile = game.getPile('DRAW');
        $scope.discardPile = game.getPile('DISCARD');
        $scope.drawCard = game.drawCard;
        $scope.resetLibrary = game.resetLibrary;
        $scope.moveTopCardToResolutionPile = game.moveTopCardToResolutionPile;


        //If move handler is not in select state
        // and the user clicks on a card
        // the clicked card is saved off and the state changes to selected state



        //If move handler is in select state
        // and the user clicks on a pile
        // the selected card is passed to the games move card function
        // the selected card is then cleared from memory
        // teh state is then moved to not selected

    };

    function info(message){
        log.info(logName + message);
    }

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;
    app.ClickToMoveHandler = ClickToMoveHandler;
    app.controller('gameController', ['$scope', '$log', '_', 'clickToMoveHandler', 'solitaireDataService', GameController]);

    //this function is primarlarly for unit testing purposes. we need to find a better way to do this TODO: fix me
    app.setLoDash = function(__){
        _ = __;
    }

//pass in the solitare platform namespace to the closure
})(solitaire);
