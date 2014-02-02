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

})(solitaire);
