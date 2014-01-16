(function(app){

    var TodoController = function($scope){

        var todos = [
            {
                text: 'Develop Ui - (in process)',
                done: false
            },
            {
                text:'Interact with the UI',
                done: false
            },
            {
                text:'Implement rules',
                done: false
            },
            {
                text:'Implement win screen',
                done: false
            },
            {
                text:'Implement score tracking',
                done: false
            }
        ];

        $scope.totalTodos = 4;
        $scope.todos = todos;

        $scope.addTodo = function(){
            if($scope.formTodoText.trim() === ''){
                return;
            }
            todos.push({
                text: $scope.formTodoText,
                done: false
            });
            $scope.formTodoText = '';
        };

    };



    app.TodoController = TodoController;
    app.controller('todoController',['$scope', TodoController]);


   })(solitaire);