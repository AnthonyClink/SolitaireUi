'use strict';

/* jasmine specs for controllers go here */

describe('The data access api', function(){

    var _;

    beforeEach(function(){
        _ = new solitaire.__();
        //note this line is just to get the closure to have underscore without relying on angular
        new solitaire.GameResource(null,null, null, _);
    });


    describe('the card api', function() {
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

    describe('the pile api', function(){
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
         expect(json.cards[0].suit).toBe('SPADES')
         expect(pile.getCards()[0]).toBe(ace);
         expect(pile.getTopCard()).toBe(ace);
         expect(pile.isEmpty()).toBe(false);
         pile.removeCard(ace);
         expect(pile.isEmpty()).toBe(true);
         expect(pile.getTopCard().getRank()).toBe('BLANK');
         expect(json.cards.length).toBe(0);
      });
    });

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
