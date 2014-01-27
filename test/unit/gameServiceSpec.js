'use strict';

/* jasmine specs for controllers go here */

describe('The Game Service ', function(){

    var service;

    beforeEach(function(){
        var gameResource = {};

        gameResource.GET = function(id){
          return solitaire.testGame;
        };

        service = new solitaire.SolitaireDataService(null, gameResource, solitaire.__);
    });


    it('should contain access to the game data', function() {
        var gameBoard = service.getGame();
        expect(gameBoard).toBeDefined();
        expect(gameBoard.drawPile.size).toBe(24);
        expect(gameBoard.getPlayArea()[0].getCards().length).toBe(1);
        expect(gameBoard.getPlayArea()[0].getCards().cards[0].isFaceUp()).toBe(true);
    });

});
