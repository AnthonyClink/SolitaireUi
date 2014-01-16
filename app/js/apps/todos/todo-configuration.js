(function(app){

    app.addUiRouteConfiguration({name:'todos', config:{
        url : '/todos',
        views: {
            content : {controller: 'todoController', templateUrl : 'views/todos/todos.html'}
        }
    }});

})(solitaire);