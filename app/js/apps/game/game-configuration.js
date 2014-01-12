(function(app){

    app.addUiRouteConfiguration({name:'game', config:{
        url : '/game',
        views: {
            content : {controller: 'gameController', templateUrl : 'views/game/solitaire.html'},
         }
    }});

})(solitaire)