//closure to contain state in the solitare namespace.
(function(app){

    var logName = 'solitaire.BoardService: ',
        logger,
         _,
         resource;

    var GameBoardResource = function(){

        var self = {};

        var gameBoardEndpoint = resource('http://localhost:8080/solitare/gameboard/{:gameBoardId}', {gameBoardId : 0}, {

        });

        var PileResource = resource('http://localhost:8080/soliare/gameboard/{:gameBoardId}/{:pileId}', null, {
            move : {
                method : 'PUT'
            }
        });

        var moveCard = function(){
            //new PileResource({gameBoardId : 0, })
        };

        self.get = gameBoardEndpoint.get;


        return self;

    };

    var BoardService = function($resource, $log, __, $rootScope){
        resource = $resource;
        logger = $log;
        _ = __;

        var self = {};

        var boardResource = new GameBoardResource();

        self.gameBoard = new GameBoard();

        self.rawGameBoard =  boardResource.get({}, function(){
            var board = self.gameBoard;
            var rawBoard = self.rawGameBoard;
            info('Wrapping the game board');
            _.forOwn(rawBoard, function(object, name){
                if(name[0] != '$'){
                    board.addPile(new Pile(name, object));
                    info(name + ': ' + object);
                }
            });
            $rootScope.$broadcast('SOLITAIRE_BOARD_LOADED');
        });

        self.getGameBoard = function(){

            return self.gameBoard;
        };

        return self;
    };

    var GameBoard = function(){

        var self = {},
            piles = [],
            playAreaPiles = [],
            resolutionPiles = [];

        self.addPile = function(pile){
            piles.push(pile);
        };

        self.getResolutionPiles = function(){
            if(resolutionPiles.length == 0){
                resolutionPiles.push(self.getHearts());
                resolutionPiles.push(self.getSpades());
                resolutionPiles.push(self.getDiamonds());
                resolutionPiles.push(self.getClubs());
            }
            return resolutionPiles;
        };

        self.getPlayAreaPiles = function(){

            if(playAreaPiles.length == 0){
                playAreaPiles.push(self.getPileOne());
                playAreaPiles.push(self.getPileTwo());
                playAreaPiles.push(self.getPileThree());
                playAreaPiles.push(self.getPileFour());
                playAreaPiles.push(self.getPileFive());
                playAreaPiles.push(self.getPileSix());
                playAreaPiles.push(self.getPileSeven());
            }

            return playAreaPiles;
        };

        self.getPiles = function(){
            return piles;
        }

        self.getDrawPile = function(){
            return getPile('drawDeck');
        };

        self.getDiscardPile = function(){
            return getPile('discardDeck');
        };

        self.getPileOne = function(){
            return getPile('reg1Deck');
        };

        self.getPileTwo = function(){
            return getPile('reg2Deck');
        };

        self.getPileThree = function(){
            return getPile('reg3Deck');
        };

        self.getPileFour = function(){
            return getPile('reg4Deck');
        };

        self.getPileFive = function(){
            return getPile('reg5Deck');
        };

        self.getPileSix = function(){
            return getPile('reg6Deck');
        };

        self.getPileSeven = function(){
            return getPile('reg7Deck');
        };

        self.getHearts = function(){
            return getPile('heartsDeck');
        };

        self.getClubs = function(){
            return getPile('clubsDeck');
        };

        self.getSpades = function(){
            return getPile('spadesDeck');
        };

        self.getDiamonds = function(){
            return getPile('diamondsDeck');
        };

        var getPile = function(name){
            return _.filterWithProperty(piles, 'name', name)[0];
        };

        self.getPile = getPile;

        return self;
    }

    var Pile = function(name, pileData){

        var cards = [],
            self = {};

        self.name = name;

        var wrapCard = function(cardData){
            info('Creating card ' + cardData.shortName + ' in pile: ' + name);
            return new Card(cardData);
        };

        for(var i = 0; i < pileData.cards.length; i++){
            cards.push(wrapCard(pileData.cards[i]));
        };

        self.removeCard = function(index){
            var cardToDelete = cards[index];
            cardToDelete.pile = undefined;
            cards = _.without(cards, cardToDelete);
        }

        self.getName = function(){
            return self.name;
        };

        self.getCards = function(){
            if(cards.length == 0){
                var fakeList = [];
                fakeList.push(app.util.blankCard);
                return fakeList;
            }
            return cards;
        };

        self.getTopCard = function(){
            var card;
            if(cards.length === 0){
                card = new Card(pileData.topCard);
                card.pile = self;
                return card;
            }
            return cards[cards.length - 1];
        };

        self.addCard = function(card){
            cards.push(card);
            card.pile = self;
        }

        return self;

    };



    var Card = function(cardData){

        var self = cardData;
        var css;

        self.isFaceDown = function(){
          return !cardData.faceUp;
        };

        self.isFaceUp = function(){
            return cardData.faceUp;
        };

        self.isMoveable = function(){
            return self.isFaceUp() && self.rank !== 'BLANK';
        }


        self.getCSS = function(){

            if(!css){
                var nameArray = cardData.longName.split(' ');
                css = nameArray[0].toLowerCase();
                css = css + capFirstLetter(nameArray[1]) + nameArray[2];
            }

            return css;
        };

        return self;
    };


    function info(message){
        logger.info(logName + message)
    }

    function debug(message){
        logger.debug(logName + message)
    }

    function capFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //make constructor accessible via the solitare namespace
    app.GameBoard = GameBoard;
    app.Card = Card;
    app.Pile = Pile;
    app.BoardService = BoardService;
    app.GameBoardResource = GameBoardResource;
    app.util = {};

    app.util.blankCard = new Card({
        rank:'BLANK',
        suit:'BLANK',
        faceUp :true,
        shortName:'b-b',
        longName:'Blank of Card',
        red:false
    });

    app.factory('boardService', ['$resource', '$log', '_', '$rootScope', BoardService]);

//pass in the solitare platform namespace to the closure
})(solitaire);
