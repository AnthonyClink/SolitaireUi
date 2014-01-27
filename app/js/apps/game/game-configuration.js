(function(app){

    app.addUiRouteConfiguration({name:'game', config:{
        url : '/game',
        views: {
            header : {templateUrl: 'views/home/header.html'},
            content : {controller: 'gameController', templateUrl : 'views/game/solitaire.html'},
            menu : {templateUrl: 'views/home/menu.html'}
        }
    }});

})(solitaire);