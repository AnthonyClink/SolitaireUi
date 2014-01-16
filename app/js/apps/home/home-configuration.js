(function (app) {

    app.addUiRouteConfiguration({name: 'home', config: {
        url: '/',
        views: {
            header: {templateUrl: 'views/home/header.html'},
            content: {controller: 'homeController', templateUrl: 'views/home/goals.html'},
            menu: {templateUrl: 'views/home/menu.html'}
        }
    }});

})(solitaire);