(function(app){
    var resource,
        _;



    var GameResource = function($resource, rawGame, mockGame, __){

        var self = {};

        _ = __;

        self.GET = function(id){
            return rawGame;
        };

      return self;
    };

    var SolitaireDataService = function(gameResource, dataAccessApi){

        var self = {};
        self.getGame = function(){
            return new dataAccessApi.Table(gameResource.GET(0));
        };
        return self;
    };

    app.GameResource = GameResource;
    app.SolitaireDataService = SolitaireDataService;
    app.factory('gameResource', ['$resource', 'rawGame', 'mockGame', '_', GameResource]);
    app.factory('solitaireDataService', ['gameResource', 'dataAccessAPI', SolitaireDataService]);

})(solitaire);