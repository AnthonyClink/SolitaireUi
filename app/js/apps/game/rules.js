(function(app){

    var rules = {
        MOVE_RULES:[
            {
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
            },
            {
                TARGET : {
                    PILE : {
                        TYPE : 'REGULAR'
                    },
                    CARD : {
                        COLOR : '{{SELECTED.CARD.OPPOSITE_COLOR}}',
                        VALUE : '{{(SELECTED.CARD.VALUE + 1)}}'
                    }
                }
            }

        ],
        AFTER_EXECUTION_RULES:[]
    };

    app.value('rules', rules);
})(solitaire);