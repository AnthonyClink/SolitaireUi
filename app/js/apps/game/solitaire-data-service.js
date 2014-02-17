(function(app){
    var logName = 'solitaire.DataService: ',
        _,
        dataLayer,
        log,
        serverUrl;



    var GameResource = function($resource, baseServerUrl, __, $log, $rootScope){

        serverUrl = baseServerUrl;

        log = $log;

        var self = {};

        _ = __;

        var solitaireGamesEndpoint = $resource(baseServerUrl + '/solitaire/games', null, {
            createGame : {
                method : 'POST',
                transformResponse : function(data){
                    data = angular.fromJson(data);
                    var game = new dataLayer.Table(data);
                    _.forEach(app.PILE_NAMES, function(name){
                        info('Prepared data for ' + name + ': ' + _.map(game.getPile(name).getCards(), function(card){
                            return '{' + (card.isFaceDown() ? "F-D" : card.getShortName()) + '}';
                        }));
                    });
                    return game;
                }
            }
        });

        self.createGame = function(config){
            return solitaireGamesEndpoint.createGame(config);
        };

        return self;
    };

    var SolitaireDataService = function(gameResource, dataAccessApi, $log){

        if(!log){
            log = $log;
        }

        dataLayer = dataAccessApi;

        var self = {};

        self.createGame = function(){
            info('asking server: ' + serverUrl + ' to create a new game');
            var game = gameResource.createGame({});
            return game;
        };
        return self;
    };

    function info(message){
        log.info(logName + message);
    }

    app.GameResource = GameResource;
    app.SolitaireDataService = SolitaireDataService;
    app.factory('gameResource', ['$resource', 'baseServerUrl', '_', '$log', '$rootScope', GameResource]);
    app.factory('solitaireDataService', ['gameResource', 'dataAccessAPI', SolitaireDataService]);

})(solitaire);