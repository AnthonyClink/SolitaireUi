'use strict';

/* jasmine specs for controllers go here */

describe('The Game Service ', function(){

    var service;

    beforeEach(function(){
        service = new solitaire.GameService();
    });


    it('should contain access to the game data', function() {
        var gameBoard = service.getGame();
        expect(gameBoard).toBeDefined();
        expect(gameBoard.drawPile.size).toBe(24);
        expect(gameBoard.reg1Pile.size).toBe(1);
        expect(gameBoard.reg1Pile.cards[0].faceUp).toBe(true);
    });

});
