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
                        SUIT : '{{TARGET.PILE.SUBTYPE}}',
                        FACE_UP : 'true'
                    }
                }
            },
            {
                TARGET : {
                    PILE : {
                        TYPE : 'REGULAR',
                        SIZE : 0
                    }
                },
                SELECTED : {
                    CARD : {
                        RANK : 'KING'
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
                        VALUE : '{{SELECTED.CARD.VALUE + 1}}'
                    }
                },
                SELECTED : {
                    CARD : {
                        FACE_UP : true
                    }
                }
            },
            {
                TARGET : {
                    PILE : {
                        TYPE : 'RESOLUTION'
                    },
                    CARD : {
                        SUIT : '{{SELECTED.CARD.SUIT}}',
                        VALUE : '{{SELECTED.CARD.VALUE - 1}}'
                    }
                }
            },
            {
                TARGET : {
                    PILE : {
                        TYPE : 'DISCARD'
                    }
                },
                SELECTED : {
                    PILE : {
                        TYPE : 'DRAW',
                        SIZE : 0
                    }
                },
                onSuccess : function(move){
                    console.log('reset called');
                    move.getGame().resetLibrary();
                }
            },
            {
                TARGET : {
                    PILE : {
                        TYPE : 'DISCARD'
                    }
                },
                SELECTED : {
                    PILE : {
                        TYPE : 'DRAW'
                    }
                },
                onSuccess : function(move){
                    move.getGame().drawCard();
                    console.log('draw called called');
                }
            }
        ],
        AFTER_EXECUTION_RULES:[
            {
                SELECTED : {
                    PILE : {
                        TYPE : 'REGULAR'
                    },
                    onSuccess : function(move){
                      var card = move.getSelectedPile().getTopCard();
                      if(card && card.isFaceDown()){
                          card.turnFaceUp();
                      }
                    }
                }

            }
        ]
    };

    app.value('rules', rules);
})(solitaire);