(function(app){

    app.testJson = {};

    var testValues = app.testJson;


    testValues.createFaceUpCard = function(rank, suit){
        var card = testValues.getJsonDataForFaceUpAceOfSpades();
        card.rank = rank;
        card.suit = suit;
        return card;
    };

    testValues.createFaceDownCard = function(rank, suit){
        var card = testValues.getJsonDataForFaceDownAceOfSpades();
        card.rank = rank;
        card.suit = suit;
        return card;
    };

    testValues.getJsonDataForAGameSetupWithTwoFaceDownAcesInTheDrawPile = function(){
        var tableData = testValues.getJsonDataForAnEmptyFullyInitalizedTable();
        tableData.DRAW.cards.push(testValues.getJsonDataForFaceDownAceOfSpades());
        tableData.DRAW.cards.push(testValues.getJsonDataForFaceDownAceOfHearts());
        return tableData;
    };

    testValues.getJsonDataForAGameSetupWithAFaceDownAceInTheDrawPile = function(){
        var tableData = testValues.getJsonDataForAnEmptyFullyInitalizedTable();
        tableData.DRAW.cards.push(testValues.getJsonDataForFaceDownAceOfSpades());
        return tableData;
    };

    testValues.getJsonDataForAGameSetupWithAFaceUpAceInTheDiscardPile = function(){
        var tableData = testValues.getJsonDataForAnEmptyFullyInitalizedTable();
        tableData.DISCARD.cards.push(testValues.getJsonDataForFaceUpAceOfSpades());
        return tableData;
    };

    testValues.getJsonDataForAnEmptyFullyInitalizedTable = function(){
        return {
            "id":"0",
            "RESOLUTION_SPADES":{
                "cards":[

                ]
            },
            "REGULAR_7":{
                "cards":[

                ]
            },
            "REGULAR_1":{
                "cards":[

                ]
            },
            "REGULAR_2":{
                "cards":[

                ]
            },
            "DISCARD":{
                "cards":[

                ]
            },
            "RESOLUTION_CLUBS":{
                "cards":[

                ]
            },
            "REGULAR_4":{
                "cards":[

                ]
            },
            "RESOLUTION_HEARTS":{
                "cards":[

                ]
            },
            "REGULAR_6":{
                "cards":[

                ]
            },
            "RESOLUTION_DIAMONDS":{
                "cards":[

                ]
            },
            "REGULAR_3":{
                "cards":[

                ]
            },
            "REGULAR_5":{
                "cards":[

                ]
            },
            "DRAW":{
                "cards":[

                ]
            }
        }
    };

    testValues.getJsonDataForFaceDownAceOfSpades = function(){
        return {
            "rank":"ACE",
            "suit":"SPADES",
            "cardState":"FACE_DOWN",
            "fullName":"Ace Of Spades",
            "color":"BLACK",
            "shortName":"A-S"
        };
    };

    testValues.getJsonDataForFaceDownAceOfHearts = function(){
        return {
            "rank":"ACE",
            "suit":"HEARTS",
            "cardState":"FACE_DOWN",
            "fullName":"Ace Of Hearts",
            "color":"RED",
            "shortName":"A-H"
        };
    };


    testValues.getJsonDataForFaceUpAceOfSpades = function(){
        return {
            "rank":"ACE",
            "suit":"SPADES",
            "cardState":"FACE_UP",
            "fullName":"Ace Of Spades",
            "color":"BLACK",
            "shortName":"A-S"
        };
    };

    testValues.getJsonDataForAnEmptyPile = function(){
        return {"cards":[]};
    };


    testValues.getJsonDataForFullTestGame = function(){
            return {
                "id":"1",
                "RESOLUTION_DIAMONDS":{
                    "cards":[

                    ]
                },
                "REGULAR_3":{
                    "cards":[
                        {
                            "rank":"QUEEN",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Queen Of Spades",
                            "color":"BLACK",
                            "shortName":"Q-S"
                        },
                        {
                            "rank":"FOUR",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Four Of Clubs",
                            "color":"BLACK",
                            "shortName":"4-C"
                        },
                        {
                            "rank":"TEN",
                            "suit":"SPADES",
                            "cardState":"FACE_UP",
                            "fullName":"Ten Of Spades",
                            "color":"BLACK",
                            "shortName":"10-S"
                        }
                    ]
                },
                "REGULAR_4":{
                    "cards":[
                        {
                            "rank":"NINE",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Nine Of Hearts",
                            "color":"RED",
                            "shortName":"9-H"
                        },
                        {
                            "rank":"SEVEN",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Seven Of Clubs",
                            "color":"BLACK",
                            "shortName":"7-C"
                        },
                        {
                            "rank":"JACK",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Jack Of Clubs",
                            "color":"BLACK",
                            "shortName":"J-C"
                        },
                        {
                            "rank":"NINE",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_UP",
                            "fullName":"Nine Of Diamonds",
                            "color":"RED",
                            "shortName":"9-D"
                        }
                    ]
                },
                "DISCARD":{
                    "cards":[

                    ]
                },
                "REGULAR_2":{
                    "cards":[
                        {
                            "rank":"SEVEN",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Seven Of Hearts",
                            "color":"RED",
                            "shortName":"7-H"
                        },
                        {
                            "rank":"NINE",
                            "suit":"SPADES",
                            "cardState":"FACE_UP",
                            "fullName":"Nine Of Spades",
                            "color":"BLACK",
                            "shortName":"9-S"
                        }
                    ]
                },
                "REGULAR_6":{
                    "cards":[
                        {
                            "rank":"FIVE",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Five Of Spades",
                            "color":"BLACK",
                            "shortName":"5-S"
                        },
                        {
                            "rank":"THREE",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Three Of Spades",
                            "color":"BLACK",
                            "shortName":"3-S"
                        },
                        {
                            "rank":"SIX",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Six Of Diamonds",
                            "color":"RED",
                            "shortName":"6-D"
                        },
                        {
                            "rank":"KING",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"King Of Hearts",
                            "color":"RED",
                            "shortName":"K-H"
                        },
                        {
                            "rank":"QUEEN",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Queen Of Clubs",
                            "color":"BLACK",
                            "shortName":"Q-C"
                        },
                        {
                            "rank":"TEN",
                            "suit":"HEARTS",
                            "cardState":"FACE_UP",
                            "fullName":"Ten Of Hearts",
                            "color":"RED",
                            "shortName":"10-H"
                        }
                    ]
                },
                "RESOLUTION_SPADES":{
                    "cards":[

                    ]
                },
                "RESOLUTION_HEARTS":{
                    "cards":[

                    ]
                },
                "RESOLUTION_CLUBS":{
                    "cards":[

                    ]
                },
                "REGULAR_5":{
                    "cards":[
                        {
                            "rank":"EIGHT",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Eight Of Diamonds",
                            "color":"RED",
                            "shortName":"8-D"
                        },
                        {
                            "rank":"TWO",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Two Of Clubs",
                            "color":"BLACK",
                            "shortName":"2-C"
                        },
                        {
                            "rank":"JACK",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Jack Of Hearts",
                            "color":"RED",
                            "shortName":"J-H"
                        },
                        {
                            "rank":"ACE",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Ace Of Diamonds",
                            "color":"RED",
                            "shortName":"A-D"
                        },
                        {
                            "rank":"JACK",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_UP",
                            "fullName":"Jack Of Diamonds",
                            "color":"RED",
                            "shortName":"J-D"
                        }
                    ]
                },
                "REGULAR_7":{
                    "cards":[
                        {
                            "rank":"QUEEN",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Queen Of Hearts",
                            "color":"RED",
                            "shortName":"Q-H"
                        },
                        {
                            "rank":"THREE",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Three Of Clubs",
                            "color":"BLACK",
                            "shortName":"3-C"
                        },
                        {
                            "rank":"EIGHT",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Eight Of Spades",
                            "color":"BLACK",
                            "shortName":"8-S"
                        },
                        {
                            "rank":"TWO",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Two Of Diamonds",
                            "color":"RED",
                            "shortName":"2-D"
                        },
                        {
                            "rank":"FIVE",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Five Of Clubs",
                            "color":"BLACK",
                            "shortName":"5-C"
                        },
                        {
                            "rank":"TEN",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Ten Of Diamonds",
                            "color":"RED",
                            "shortName":"10-D"
                        },
                        {
                            "rank":"ACE",
                            "suit":"SPADES",
                            "cardState":"FACE_UP",
                            "fullName":"Ace Of Spades",
                            "color":"BLACK",
                            "shortName":"A-S"
                        }
                    ]
                },
                "DRAW":{
                    "cards":[
                        {
                            "rank":"TEN",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Ten Of Clubs",
                            "color":"BLACK",
                            "shortName":"10-C"
                        },
                        {
                            "rank":"THREE",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Three Of Hearts",
                            "color":"RED",
                            "shortName":"3-H"
                        },
                        {
                            "rank":"SEVEN",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Seven Of Diamonds",
                            "color":"RED",
                            "shortName":"7-D"
                        },
                        {
                            "rank":"FOUR",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Four Of Hearts",
                            "color":"RED",
                            "shortName":"4-H"
                        },
                        {
                            "rank":"EIGHT",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Eight Of Clubs",
                            "color":"BLACK",
                            "shortName":"8-C"
                        },
                        {
                            "rank":"JACK",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Jack Of Spades",
                            "color":"BLACK",
                            "shortName":"J-S"
                        },
                        {
                            "rank":"SIX",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Six Of Clubs",
                            "color":"BLACK",
                            "shortName":"6-C"
                        },
                        {
                            "rank":"TWO",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Two Of Spades",
                            "color":"BLACK",
                            "shortName":"2-S"
                        },
                        {
                            "rank":"NINE",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Nine Of Clubs",
                            "color":"BLACK",
                            "shortName":"9-C"
                        },
                        {
                            "rank":"SIX",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Six Of Spades",
                            "color":"BLACK",
                            "shortName":"6-S"
                        },
                        {
                            "rank":"ACE",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Ace Of Clubs",
                            "color":"BLACK",
                            "shortName":"A-C"
                        },
                        {
                            "rank":"ACE",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Ace Of Hearts",
                            "color":"RED",
                            "shortName":"A-H"
                        },
                        {
                            "rank":"KING",
                            "suit":"CLUBS",
                            "cardState":"FACE_DOWN",
                            "fullName":"King Of Clubs",
                            "color":"BLACK",
                            "shortName":"K-C"
                        },
                        {
                            "rank":"TWO",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Two Of Hearts",
                            "color":"RED",
                            "shortName":"2-H"
                        },
                        {
                            "rank":"FOUR",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Four Of Spades",
                            "color":"BLACK",
                            "shortName":"4-S"
                        },
                        {
                            "rank":"KING",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"King Of Spades",
                            "color":"BLACK",
                            "shortName":"K-S"
                        },
                        {
                            "rank":"FIVE",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Five Of Diamonds",
                            "color":"RED",
                            "shortName":"5-D"
                        },
                        {
                            "rank":"FIVE",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Five Of Hearts",
                            "color":"RED",
                            "shortName":"5-H"
                        },
                        {
                            "rank":"EIGHT",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Eight Of Hearts",
                            "color":"RED",
                            "shortName":"8-H"
                        },
                        {
                            "rank":"THREE",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Three Of Diamonds",
                            "color":"RED",
                            "shortName":"3-D"
                        },
                        {
                            "rank":"SEVEN",
                            "suit":"SPADES",
                            "cardState":"FACE_DOWN",
                            "fullName":"Seven Of Spades",
                            "color":"BLACK",
                            "shortName":"7-S"
                        },
                        {
                            "rank":"FOUR",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Four Of Diamonds",
                            "color":"RED",
                            "shortName":"4-D"
                        },
                        {
                            "rank":"SIX",
                            "suit":"HEARTS",
                            "cardState":"FACE_DOWN",
                            "fullName":"Six Of Hearts",
                            "color":"RED",
                            "shortName":"6-H"
                        },
                        {
                            "rank":"KING",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_DOWN",
                            "fullName":"King Of Diamonds",
                            "color":"RED",
                            "shortName":"K-D"
                        }
                    ]
                },
                "REGULAR_1":{
                    "cards":[
                        {
                            "rank":"QUEEN",
                            "suit":"DIAMONDS",
                            "cardState":"FACE_UP",
                            "fullName":"Queen Of Diamonds",
                            "color":"RED",
                            "shortName":"Q-D"
                        }
                    ]
                }
            };
        };

})(solitaire);
