(function(app){
    app.createGetter = function(data){
        return function(){
            return data;
        }
    };
})(solitaire)