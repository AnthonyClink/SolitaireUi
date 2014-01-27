'use strict';

/* jasmine specs for controllers go here */

describe('The Data Access API', function(){

    var _;

    beforeEach(function(){
        _ = new solitaire.__();
        //note this line is just to get the closure to have underscore without relying on angular
        new solitaire.GameResource(null,null, null, _);
    });


    describe('The Card Data API', function() {
       it('should accept raw data in the json format the server is expected to deliver', function(){
          var card = new solitaire.Card(getJsonDataForFaceUpAceOfSpades());

          expect(card.getSuit()).toBe('SPADES');
          expect(card.getRank()).toBe('ACE');
          expect(card.isFaceDown()).toBe(false);
          expect(card.isFaceUp()).toBe(true);
          expect(card.isRed()).toBe(false);
          expect(card.isBlack()).toBe(true);
          expect(card.getCSS()).toBe('card aceOfSpades');

       });

      it('should be able to properly manipulate the state of the raw data and handle the changes', function(){
          var json = getJsonDataForFaceDownAceOfSpades();
          var card = new solitaire.Card(json);
          expect(card.getCSS()).toBe('card faceDown');
          expect(json.cardState).toBe('FACE_DOWN');
          expect(card.turnFaceUp().isFaceUp()).toBe(true);
          expect(json.cardState).toBe('FACE_UP');
          expect(card.getCSS()).toBe('card aceOfSpades');
      })
    });

    describe('The Pile Data API', function(){
      it('should be able to properly accept raw json data for an empty pile', function(){
          var pile = new solitaire.Pile('DRAW', getJsonDataForAnEmptyPile());
          expect(pile.getCards().length).toBe(0);
          expect(pile.getName()).toBe('DRAW');
          expect(pile.getTopCard().getRank()).toBe('BLANK');
          expect(pile.isEmpty()).toBe(true);
      });

      it('should be able to properly manipulate the state of the raw data and handle the changes', function(){
         var json = getJsonDataForAnEmptyPile();
         var pile = new solitaire.Pile('DRAW', json);
         var ace = new solitaire.Card(getJsonDataForFaceUpAceOfSpades());
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

    });

    describe('The Table Data API', function(){

        it('should be able to take in game data and represent that data through the table api', function(){
            var json = getJsonDataForAnEmptyFullyInitalizedTable();

            var table = new solitaire.Table(json);

            _.forEach(solitaire.PILE_NAMES, function(elm){
               var pile = table.getPile(elm);
               expect(pile).toBeDefined();
               expect(pile.getCards().length).toBe(0);
            });

        });

        it('should be able to update the raw json of the game through the data api', function(){
           var json = getJsonDataForAnEmptyFullyInitalizedTable();

           var table = new solitaire.Table(json);

           var card = new solitaire.Card(getJsonDataForFaceDownAceOfSpades());

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
            var json = getJsonDataForAGameSetupWithAFaceDownAceInTheDrawPile();
            var table = new solitaire.Table(json);

            var drawPile = table.getPile('DRAW');
            var discardPile = table.getPile('DISCARD');

            expect(drawPile.getCards()[0].isFaceDown()).toBe(true);

            table.drawCard();

            expect(json.DISCARD.cards.length).toBe(1);
            expect(json.DRAW.cards.length).toBe(0);

            expect(discardPile.getCards()[0].isFaceUp()).toBe(true);
        });

        it('should provide functionality to moving the top card of a pile to the correct resolution pile', function(){
            var json = getJsonDataForAGameSetupWithAFaceUpAceInTheDiscardPile();
            var table = new solitaire.Table(json);
            table.moveTopCardToResolutionPile(table.getPile('DISCARD'));
            expect(json.RESOLUTION_SPADES.cards.length).toBe(1);
            expect(json.DISCARD.cards.length).toBe(0);
        });

        it('should provide the ability to reset the cards in the discard deck, in proper order, to the draw deck', function(){
            var json = getJsonDataForAGameSetupWithTwoFaceDownAcesInTheDrawPile();
            var table = new solitaire.Table(json);
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
           var table = new solitaire.Table(json);
           expect(function(){table.getPile('DISCARD');}).toThrow();
        });

        it('should cause no error when draw card is called with an empty draw pile', function(){
           var json = getJsonDataForAnEmptyFullyInitalizedTable();
           var table = new solitaire.Table(json);

           table.drawCard();
            //assuring no exception is thrown... not sure how to create assserts for this in jasmine.
            _.forEach(solitaire.PILE_NAMES, function(name){
                expect(table.getPile(name).getCards().length).toBe(0);
            });
        });

        it('should cause no error when move to resolution pile has no target top card', function(){
            var json = getJsonDataForAnEmptyFullyInitalizedTable();
            var table = new solitaire.Table(json);

            table.moveTopCardToResolutionPile(table.getDiscardPile());

            //assuring no exception is thrown... not sure how to create assserts for this in jasmine.

            _.forEach(solitaire.PILE_NAMES, function(name){
               expect(table.getPile(name).getCards().length).toBe(0);
            });


        });

        it('should provide no error when reset is called without data in the piles', function(){
           var json = getJsonDataForAnEmptyFullyInitalizedTable();
           var table = new solitaire.Table(json);
           table.resetLibrary();
            _.forEach(solitaire.PILE_NAMES, function(name){
                expect(table.getPile(name).getCards().length).toBe(0);
            });
        });

    });


    function getJsonDataForAGameSetupWithTwoFaceDownAcesInTheDrawPile(){
        var tableData = getJsonDataForAnEmptyFullyInitalizedTable();
        tableData.DRAW.cards.push(getJsonDataForFaceDownAceOfSpades());
        tableData.DRAW.cards.push(getJsonDataForFaceDownAceOfHearts());
        return tableData;
    }

    function getJsonDataForAGameSetupWithAFaceDownAceInTheDrawPile(){
        var tableData = getJsonDataForAnEmptyFullyInitalizedTable();
        tableData.DRAW.cards.push(getJsonDataForFaceDownAceOfSpades());
        return tableData;
    }

    function getJsonDataForAGameSetupWithAFaceUpAceInTheDiscardPile(){
        var tableData = getJsonDataForAnEmptyFullyInitalizedTable();
        tableData.DISCARD.cards.push(getJsonDataForFaceUpAceOfSpades());
        return tableData;
    }

    function getJsonDataForAnEmptyFullyInitalizedTable(){
        return {
            "id":"0",
            "RESOLUTION_SPADES":{
            "cards":[

            ]
        },
            "REGULAR_7":{
            "cards":[

            ]
        },
            "REGULAR_1":{
            "cards":[

            ]
        },
            "REGULAR_2":{
            "cards":[

            ]
        },
            "DISCARD":{
            "cards":[

            ]
        },
            "RESOLUTION_CLUBS":{
            "cards":[

            ]
        },
            "REGULAR_4":{
            "cards":[

            ]
        },
            "RESOLUTION_HEARTS":{
            "cards":[

            ]
        },
            "REGULAR_6":{
            "cards":[

            ]
        },
            "RESOLUTION_DIAMONDS":{
            "cards":[

            ]
        },
            "REGULAR_3":{
            "cards":[

            ]
        },
            "REGULAR_5":{
            "cards":[

            ]
        },
            "DRAW":{
            "cards":[

            ]
        }
       }
    }

    function getJsonDataForFaceDownAceOfSpades(){
        return {
            "rank":"ACE",
            "suit":"SPADES",
            "cardState":"FACE_DOWN",
            "fullName":"Ace Of Spades",
            "color":"BLACK",
            "shortName":"A-S"
        };
    }

    function getJsonDataForFaceDownAceOfHearts(){
        return {
            "rank":"ACE",
            "suit":"HEARTS",
            "cardState":"FACE_DOWN",
            "fullName":"Ace Of Hearts",
            "color":"RED",
            "shortName":"A-H"
        };
    }


    function getJsonDataForFaceUpAceOfSpades(){
        return {
            "rank":"ACE",
            "suit":"SPADES",
            "cardState":"FACE_UP",
            "fullName":"Ace Of Spades",
            "color":"BLACK",
            "shortName":"A-S"
        };
    }

    function getJsonDataForAnEmptyPile(){
        return {"cards":[]};
    }
});
