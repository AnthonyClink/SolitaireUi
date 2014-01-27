'use strict';

/* jasmine specs for controllers go here */

describe('The Solitaire Game Controller', function(){

    var controller, _, scope, dataService, log, json;

    beforeEach(function(){
        scope = {},
            dataService = {},
            log = {};

        _ = new solitaire.__();

        log.info = function(message){
            //write to nothing... no need to clog up the log files or console
        };

        json = solitaire.createRawGame();
        solitaire.testGame = json;

        dataService.getGame = function(){
            return new solitaire.Table(json);
        }

        controller = new solitaire.GameController(scope, log, _, dataService);
    });


    it('should enable the scope to utilize the Data Access API', function() {
        var game = scope.game;

        expect(game).toBeDefined();
        expect(game.getDrawPile().getCards().length).toBe(24);
        expect(scope.drawPile).toBe(game.getDrawPile());
        expect(scope.discardPile).toBe(game.getDiscardPile());
        expect(scope.drawCard).toBe(game.drawCard);
        expect(scope.resetLibrary).toBe(game.resetLibrary);
        expect(scope.moveTopCardToResolutionPile).toBe(game.moveTopCardToResolutionPile);
        scope.drawCard();
        expect(scope.discardPile.getCards().length).toBe(1);
        expect(scope.drawPile.getCards().length).toBe(23);
        expect(json.DISCARD.cards.length).toBe(1);
        expect(json.DISCARD.cards[0].cardState).toBe('FACE_UP');
    });


});