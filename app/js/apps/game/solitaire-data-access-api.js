(function(app){

    var rawData,
        _,
        rawCardData = [];


    var DataAccessAPI = function(__){
        var self = {};

        _ = __;

        self.BlankCard = BlankCard;
        self.Card = Card;
        self.Table = Table;
        self.Pile = Pile;

        return self;
    };

    var Table = function(rawGameData){

        var self = {},
            piles = [],
            homePiles = [],
            playAreaPiles = [];

        rawData = rawGameData;

        function createPile(name, pile){
            return new Pile(name, pile);
        }

        _.forOwn(rawData, function(pile, name){
            if(name[0] !== '$' && name !== 'id'){
                piles.push(createPile(name, pile));
            }
        });

        self.drawCard = function(){

            if(self.getDrawPile().getTopCard().getRank() === 'BLANK'){
                return;
            }

            var drawPile = self.getDrawPile();
            var card = drawPile.getTopCard();
            var discardPile = self.getDiscardPile();

            card.turnFaceUp();
            drawPile.removeCard(card);
            discardPile.addCard(card);

        };

        self.resetLibrary = function(){
            var discardPile = self.getDiscardPile();
            var drawPile = self.getDrawPile();


            app.isBlankCard(drawPile.getTopCard());

            while(discardPile.getCards().length !== 0){
                var card = discardPile.getTopCard();
                discardPile.removeCard(card);
                card.turnFaceDown();
                drawPile.addCard(card);
            }

        };

        self.moveTopCardToResolutionPile = function(pile){

            var topCard = pile.getTopCard();

            if(app.isBlankCard(topCard)){
                return;
            }

            if(app.isFaceDown(topCard)){
                return;
            }

            var toPile;
            toPile = self.getPile('RESOLUTION_' + topCard.getSuit());

            toPile.addCard(topCard);
            pile.removeCard(topCard);
        };

        self.getDrawPile = function(){
            return self.getPile('DRAW');
        };

        self.getDiscardPile = function(){
            return self.getPile('DISCARD');
        };

        self.getHome = function(){

            if(homePiles.length == 0){
                homePiles.push(self.getPile('RESOLUTION_CLUBS'));
                homePiles.push(self.getPile('RESOLUTION_HEARTS'));
                homePiles.push(self.getPile('RESOLUTION_DIAMONDS'));
                homePiles.push(self.getPile('RESOLUTION_SPADES'));
            }

            return homePiles;
        };

        self.getPlayArea = function(){
            if(playAreaPiles.length == 0){
                playAreaPiles.push(self.getPile('REGULAR_1'));
                playAreaPiles.push(self.getPile('REGULAR_2'));
                playAreaPiles.push(self.getPile('REGULAR_3'));
                playAreaPiles.push(self.getPile('REGULAR_4'));
                playAreaPiles.push(self.getPile('REGULAR_5'));
                playAreaPiles.push(self.getPile('REGULAR_6'));
                playAreaPiles.push(self.getPile('REGULAR_7'));
            }

            return playAreaPiles;
        };

        self.getPile = function(name){

            var possiblePileToReturn = _.filter(piles, function(pile){
                return name === pile.getName();
            });

            if(possiblePileToReturn.length === 0){
                throw Error('We cannot seem to locate the pile named: ' + name);
            }

            return possiblePileToReturn[0];

        };

        return self;
    };

    var Pile = function(name, rawPile){
        var self = {},
            cards = [],
            rawData = rawPile,
            localName = name;

        _.forEach(rawData.cards, function(rawCard){
            cards.push(new Card(rawCard));
        });

        self.getName = function(){
            return localName;
        };

        self.getTopCard = function(){
            if(cards.length === 0){
                return new BlankCard();
            }

            var topCard = cards[cards.length -1];

            return topCard;
        };

        self.isEmpty = function(){
            return cards.length === 0;
        };

        self.addCard = function(card){
            rawData.cards.push(_.filter(rawCardData, {card:card})[0].rawData);
            cards.push(card);
        };

        self.removeCard = function(card){

            var index = cards.indexOf(card);
            if(index != -1) {
                cards.splice(index, 1);
                rawData.cards.splice(index, 1);
            }

        };

        self.getCards = function(){
            return cards;
        };

       self.getIndex = function(card){

           return _.indexOf(cards, card);
       };


        return self;

    };

    var Card = function(rawCard){
        var self = {},
            rawData = rawCard;



        self.getRank = function(){
            return rawData.rank;
        };

        self.getSuit = function(){
            return rawData.suit;
        };

        self.getColor = function(){
            return rawData.color;
        };

        self.isBlack = function(){
            return self.getColor() === 'BLACK';
        };

        self.isRed = function(){
            return self.getColor() === 'RED';
        };

        self.isFaceUp = function(){
            return rawData.cardState === 'FACE_UP';
        };

        self.isFaceDown = function(){
            return rawData.cardState === 'FACE_DOWN';
        };

        self.turnFaceUp = function(){
            rawData.cardState = 'FACE_UP';
            return self;
        };

        self.turnFaceDown = function(){
            rawData.cardState = 'FACE_DOWN';
            return self;
        };

        self.getCSS = function(){

            var css;

            if(self.isFaceUp()){
                var nameArray = rawData.fullName.split(' ');
                css = nameArray[0].toLowerCase();
                css = 'card ' + css + app.capFirstLetter(nameArray[1]) + nameArray[2];
            }

            if(self.isFaceDown()){
                css = 'card faceDown';
            }

            return css;
        };

        self.getShortName = function(){
            return rawData.shortName;
        };

        rawCardData.push({card:self, rawData:rawData});

        return self;
    };

    var BlankCard = function(){
        return new Card({
            "rank":"BLANK",
            "suit":"CARD",
            "cardState":"FACE_UP",
            "fullName":"Blank Of Card",
            "color": undefined
        });
    };

    app.DataAccessAPI = DataAccessAPI;

    app.factory('dataAccessAPI', ['_', DataAccessAPI]);

})(solitaire);