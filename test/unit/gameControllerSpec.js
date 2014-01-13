'use strict';

/* jasmine specs for controllers go here */

describe('The Game Controller ', function(){

  var scope, resource, state, controller, isCalled, passedInUrl;

  beforeEach(function(){
      scope = {};

      state = {};

      resource = function(url){
        var self = {};

        passedInUrl = url;

        self.get = function () {
            isCalled = true;
            return {};
        };

        return self;
      };

      controller = new solitaire.GameController(scope, state, null, null, null);
  });


  it('should add a gameBoard to the scope', function() {
      expect(scope.gameBoard).toBeDefined();
      expect(isCalled).toBe(true);
      expect(passedInUrl).toBe('http://localhost:8080/solitare/gameboard');
  });

});
