'use strict';

/* jasmine specs for controllers go here */

describe('The Game Controller ', function(){

  var scope, gameService, state, controller, isCalled, passedInUrl;

  beforeEach(function(){
      scope = {};

      var gameService = {};
      isCalled = false;

      gameService.getGame = function(){
          isCalled = true;
          return {};
      }

      controller = new solitaire.GameController(scope, state, gameService, null, null);
  });


  it('should add a gameBoard to the scope', function() {
      expect(scope.gameBoard).toBeDefined();
      expect(isCalled).toBe(true);
  });

});
