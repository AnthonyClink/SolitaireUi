(function(app){
    var Card = function(){
        return {
            restrict: 'A',

            link : function(scope, element, attrs){


              var cardSuit = scope.card ? scope.card.getSuit() : 'blank';

              console.log(cardSuit);


           }
        };
    }

    app.directive('card', [Card]);

})(solitaire);