'use strict';

/* jasmine specs for controllers go here */

describe('The Data Access API', function(){

    var _, Card, Pile, Table, dataApi, testData;

    beforeEach(function(){
        _ = new solitaire.__();
        dataApi = new solitaire.DataAccessAPI(_);
        Card = dataApi.Card;
        Pile = dataApi.Pile;
        Table = dataApi.Table;
        testData = solitaire.testJson;

    });

    describe('The core Data API', function(){
        it('should be able to provide the ability to copy game state', function(){
           var game = new Table(testData.getJsonDataForFullTestGame());

           var gameCopy = dataApi.copyState(game);

           expect(gameCopy).toBeTruthy();
           expect(game === gameCopy).toBeFalsy();

           expect(gameCopy.getDrawPile().getTopCard().getRank()).toBe(game.getDrawPile().getTopCard().getRank());
           expect(gameCopy.getId()).toBe(game.getId());
        });
    })

    describe('The Card Data API', function() {
        it('should accept raw data in the json format the server is expected to deliver', function(){
            var card = new Card(testData.getJsonDataForFaceUpAceOfSpades());

            expect(card.getSuit()).toBe('SPADES');
            expect(card.getRank()).toBe('ACE');
            expect(card.isFaceDown()).toBe(false);
            expect(card.isFaceUp()).toBe(true);
            expect(card.isRed()).toBe(false);
            expect(card.isBlack()).toBe(true);
            expect(card.getCSS()).toBe('card aceOfSpades');

        });

        it('should be able to properly manipulate the state of the raw data and handle the changes', function(){
            var json = testData.getJsonDataForFaceDownAceOfSpades();
            var card = new Card(json);
            expect(card.getCSS()).toBe('card faceDown');
            expect(json.cardState).toBe('FACE_DOWN');
            expect(card.turnFaceUp().isFaceUp()).toBe(true);
            expect(json.cardState).toBe('FACE_UP');
            expect(card.getCSS()).toBe('card aceOfSpades');
        })
    });

    describe('The Pile Data API', function(){
        it('should be able to properly accept raw json data for an empty pile', function(){
            var pile = new Pile('DRAW', testData.getJsonDataForAnEmptyPile());
            expect(pile.getCards().length).toBe(0);
            expect(pile.getName()).toBe('DRAW');
            expect(pile.getTopCard().getRank()).toBe('BLANK');
            expect(pile.isEmpty()).toBe(true);
        });

        it('should be able to properly manipulate the state of the raw data and handle the changes', function(){
            var json = testData.getJsonDataForAnEmptyPile();
            var pile = new Pile('DRAW', json);
            var ace = new Card(testData.getJsonDataForFaceUpAceOfSpades());
            pile.addCard(ace);
            expect(json.cards[0].rank).toBe('ACE');
            expect(json.cards[0].suit).toBe('SPADES');
            expect(pile.getCards()[0]).toBe(ace);
            expect(pile.getTopCard()).toBe(ace);
            expect(pile.isEmpty()).toBe(false);
            pile.removeCard(ace);
            expect(pile.isEmpty()).toBe(true);
            expect(pile.getTopCard().getRank()).toBe('BLANK');
            expect(json.cards.length).toBe(0);
        });

        it('should provide card index when given a card', function(){
           var json = testData.getJsonDataForAnEmptyPile();
            json.cards.push(testData.getJsonDataForFaceUpAceOfSpades());
            var pile = new Pile('testPile', json);
            var ace = pile.getTopCard();
            expect(pile.getIndex(ace)).toBe(0);
        });

    });

    describe('The Table Data API', function(){

        it('should be able to take in game data and represent that data through the table api', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();

            var table = new Table(json);

            _.forEach(solitaire.PILE_NAMES, function(elm){
                var pile = table.getPile(elm);
                expect(pile).toBeDefined();
                expect(pile.getCards().length).toBe(0);
            });

        });

        it('should be able to update the raw json of the game through the data api', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();

            var table = new Table(json);

            var card = new Card(testData.getJsonDataForFaceDownAceOfSpades());

            var drawPile = table.getPile('DRAW');

            //note this is from the internal pile api, this is affecting the json passed into the table object
            drawPile.addCard(card);

            //test to ensure that the table json object gets the proper raw data update
            //this is important when we gear up to send data to /solitaire/game/{id} - PUT
            expect(json.DRAW.cards[0].rank).toBe('ACE');
            expect(json.DRAW.cards[0].suit).toBe('SPADES');
            expect(drawPile.getCards()[0].isFaceDown()).toBe(true);

        });

        it('should provide functionality drawing cards and adding them to the discard pile face up', function(){
            var json = testData.getJsonDataForAGameSetupWithAFaceDownAceInTheDrawPile();
            var table = new Table(json);

            var drawPile = table.getPile('DRAW');
            var discardPile = table.getPile('DISCARD');

            expect(drawPile.getCards()[0].isFaceDown()).toBe(true);

            table.drawCard();

            expect(json.DISCARD.cards.length).toBe(1);
            expect(json.DRAW.cards.length).toBe(0);

            expect(discardPile.getCards()[0].isFaceUp()).toBe(true);
        });

        it('should provide functionality to moving a spade of a pile to the correct resolution pile', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);
            table.getDiscardPile().addCard(new Card(testData.createFaceUpCard('ACE', 'SPADES')));
            table.moveTopCardToResolutionPile(table.getPile('DISCARD'));
            expect(json.RESOLUTION_SPADES.cards.length).toBe(1);
            expect(json.DISCARD.cards.length).toBe(0);
            expect(table.getPile('RESOLUTION_SPADES').getCards().length).toBe(1);
        });

        it('should provide functionality to moving a diamond of a pile to the correct resolution pile', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);
            table.getDiscardPile().addCard(new Card(testData.createFaceUpCard('ACE', 'DIAMONDS')));
            table.moveTopCardToResolutionPile(table.getPile('DISCARD'));
            expect(json.RESOLUTION_DIAMONDS.cards.length).toBe(1);
            expect(json.DISCARD.cards.length).toBe(0);
            expect(table.getPile('RESOLUTION_DIAMONDS').getCards().length).toBe(1);
        });

        it('should provide functionality to moving a clubs of a pile to the correct resolution pile', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);
            table.getDiscardPile().addCard(new Card(testData.createFaceUpCard('ACE', 'CLUBS')));
            table.moveTopCardToResolutionPile(table.getPile('DISCARD'));
            expect(json.RESOLUTION_CLUBS.cards.length).toBe(1);
            expect(json.DISCARD.cards.length).toBe(0);
            expect(table.getPile('RESOLUTION_CLUBS').getCards().length).toBe(1);
        });

        it('should provide functionality to moving a heart of a pile to the correct resolution pile', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);
            table.getDiscardPile().addCard(new Card(testData.createFaceUpCard('ACE', 'HEARTS')));
            table.moveTopCardToResolutionPile(table.getPile('DISCARD'));
            expect(json.RESOLUTION_HEARTS.cards.length).toBe(1);
            expect(json.DISCARD.cards.length).toBe(0);
            expect(table.getPile('RESOLUTION_HEARTS').getCards().length).toBe(1);
        });

        it('should provide the ability to reset the cards in the discard deck, in proper order, to the draw deck', function(){
            var json = testData.getJsonDataForAGameSetupWithTwoFaceDownAcesInTheDrawPile();
            var table = new Table(json);
            var drawPile = table.getPile('DRAW');
            var discardPile = table.getPile('DISCARD');

            table.drawCard();

            expect(json.DRAW.cards.length).toBe(1);
            expect(json.DISCARD.cards.length).toBe(1);

            expect(drawPile.getTopCard().isFaceDown()).toBe(true);
            expect(discardPile.getTopCard().isFaceDown()).toBe(false);
            expect(discardPile.getTopCard().getSuit()).toBe('HEARTS');

            table.drawCard();
            expect(json.DRAW.cards.length).toBe(0);
            expect(json.DISCARD.cards.length).toBe(2);

            expect(drawPile.getTopCard().getRank()).toBe('BLANK');
            expect(discardPile.getTopCard().isFaceDown()).toBe(false);
            expect(discardPile.getTopCard().getSuit()).toBe('SPADES');

            table.resetLibrary();

            expect(json.DRAW.cards.length).toBe(2);
            expect(json.DISCARD.cards.length).toBe(0);

            expect(drawPile.getTopCard().isFaceDown()).toBe(true);
            expect(drawPile.getTopCard().getSuit()).toBe('HEARTS');

        });

        it('should throw an error when a pile cannot be located', function(){
            var json = {
                id:"0",
                DRAW : {cards:[]}
            };
            var table = new Table(json);
            expect(function(){table.getPile('DISCARD');}).toThrow();
        });

        it('should cause no error when draw card is called with an empty draw pile', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);

            table.drawCard();
            //assuring no exception is thrown... not sure how to create assserts for this in jasmine.
            _.forEach(solitaire.PILE_NAMES, function(name){
                expect(table.getPile(name).getCards().length).toBe(0);
            });
        });

        it('should cause no error when move to resolution pile has no target top card', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);

            table.moveTopCardToResolutionPile(table.getDiscardPile());

            //assuring no exception is thrown... not sure how to create assserts for this in jasmine.

            _.forEach(solitaire.PILE_NAMES, function(name){
                expect(table.getPile(name).getCards().length).toBe(0);
            });


        });

        it('should provide no error when reset is called without data in the piles', function(){
            var json = testData.getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new Table(json);
            table.resetLibrary();
            _.forEach(solitaire.PILE_NAMES, function(name){
                expect(table.getPile(name).getCards().length).toBe(0);
            });
        });

    });

});
