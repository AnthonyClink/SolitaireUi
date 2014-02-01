//closure to contain state in the solitare namespace.
(function(app){

    var log,
        logName = 'solitaire.GameController: ',
        _;

    var GameController = function($scope, $log, __, solitaireDataService){
        log = $log;
        _ = __;

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
    };

    function info(message){
        log.info(logName + message);
    };

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$log', '_', 'solitaireDataService', GameController]);

//pass in the solitare platform namespace to the closure
})(solitaire);
