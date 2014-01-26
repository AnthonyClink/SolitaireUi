var eventHandler = (function(){
    var events = [];

    function addEvent(name, event){
        events.push({name: name, event: event});
    }

    var publicApi = {};

    publicApi.addEvent = addEvent;

    publicApi.respondToEvent = function(name){
        for(eventIndex in events){
            if(events[eventIndex].name === name){
                events[eventIndex].event();
            }
        }
    }

    publicApi.addEvent("HELLO", function(){
        alert('HELLO happened');
    });

    publicApi.respondToEvent("HELLO");

    return publicApi;
})();