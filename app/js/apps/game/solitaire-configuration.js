(function(app){

    app.addUiRouteConfiguration({name:'game', config:{
        url : '/game',
        views: {
            content : {controller : 'gameController', templateUrl : 'views/game/solitaire.html'},
            menu : {controller : 'moveManagerMenuController', templateUrl : 'views/game/menu.html'}
        }
    }});

})(solitaire);