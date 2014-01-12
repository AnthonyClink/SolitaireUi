//closure to contain state in the solitare namespace.
(function(app){



    var GameController = function($scope, $state, $resource){
	
		var GameBoard = $resource('http://localhost:8080/solitare/gameboard');
		
		$scope.gameBoard = GameBoard.get();
		
    };
	

    //make constructor accessible via the solitare namespace
    app.GameController = GameController;

    app.controller('gameController', ['$scope', '$state', '$resource', GameController]);

//pass in the solitare platform namespace to the closure
})(solitaire);