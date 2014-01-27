'use strict';

/* jasmine specs for controllers go here */

describe('The Game Service ', function(){

    var service;

    beforeEach(function(){
        var gameResource = {};

        gameResource.GET = function(id){
          return solitaire.testGame;
        };

        service = new solitaire.SolitaireDataService(gameResource, new solitaire.__());
    });


    it('should contain access to the game data', function() {
        var gameBoard = service.getGame();
        expect(gameBoard).toBeDefined();
        expect(gameBoard.getDrawPile().getCards().length).toBe(24);
        expect(gameBoard.getPlayArea()[0].getCards().length).toBe(1);
        expect(gameBoard.getPlayArea()[0].getCards()[0].isFaceUp()).toBe(true);
        expect(gameBoard.getPlayArea()[1].getCards()[0].isFaceDown()).toBe(true);

        var lastPileCards = gameBoard.getPlayArea()[6].getCards();

        expect(lastPileCards.length).toBe(7);
        expect(lastPileCards[0].isFaceDown()).toBe(true);
        expect(lastPileCards[6].isFaceUp()).toBe(true);
    });

});
