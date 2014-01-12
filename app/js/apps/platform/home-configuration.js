(function(app){

    app.addUiRouteConfiguration({name:'home', config:{
        url : '/',
        views: {
            header : {templateUrl : 'views/home/header.html'},
            content : {controller: 'homeController', templateUrl : 'views/home/goals.html'},
            menu : {templateUrl : 'views/home/menu.html'}
        }
    }});

    app.addUiRouteConfiguration({name:'home.todos', config:{
        url : 'todos',
        views: {
            //overwrite the content div when state is home.todos
            'content@': {templateUrl: 'views/home/todos.html'}
        }
    }});
})(solitaire)