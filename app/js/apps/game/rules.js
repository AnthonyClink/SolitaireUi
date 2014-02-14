(function(app){
    var resolutionEmptyRule = {
        TARGET : {
            PILE : {
                TYPE : 'RESOLUTION',
                SIZE : 0
            }
        },
        SELECTED : {
            CARD : {
                RANK : 'ACE',
                SUIT : '{{TARGET.PILE.SUBTYPE}}'
            }
        }
    };

})(solitaire);