describe('The Click Handler API', function(){

   var clickHandler, scope, testData, dataApi, _, faceUpAceOfSpades, faceUpAceOfHearts;

    beforeEach(function(){

        scope = {};

        testData = solitaire.testJson;

        _ = new solitaire.__();

        dataApi = new solitaire.DataAccessAPI(_);

        var aceOSpades = testData.getJsonDataForFaceUpAceOfSpades();

        faceUpAceOfSpades = new dataApi.Card(aceOSpades);

        var heartData = testData.getJsonDataForFaceDownAceOfHearts();
        heartData.cardState = 'FACE_UP';

        faceUpAceOfHearts = new dataApi.Card(heartData);

        clickHandler = new solitaire.ClickToMoveHandler(_);

    });

    it('can initialize the scopes selected state', function(){
        expect(clickHandler.isInSelectedState()).toBe(false);
       expect(clickHandler.getCurrentMoveData()).toBe(null);
    });

    it('responds to click events and allows the scope to be updated with selected state and provides scope with knowlege about the selected card', function(){
        var pile1 = new dataApi.Pile('testPile', testData.getJsonDataForAnEmptyPile());
        pile1.addCard(faceUpAceOfSpades);

        clickHandler.selectCard(pile1, faceUpAceOfSpades);

        expect(clickHandler.getCurrentMoveData().selectedCard).toBe(faceUpAceOfSpades);

        expect(clickHandler.isInSelectedState()).toBe(true);
    });

    it('should attempt to move the selected card to the newly selected pile', function(){

        var game = new dataApi.Table(testData.getJsonDataForAnEmptyFullyInitalizedTable()),
            selectedPile = game.getPlayArea()[0],
            targetPile = game.getPlayArea()[1],
            moveData = {};

        moveData.selectedCard = faceUpAceOfSpades;
        moveData.selectedPile = selectedPile;
        moveData.associatedCards = [faceUpAceOfSpades];
        moveData.game = game;

        selectedPile.addCard(faceUpAceOfSpades);

        clickHandler.initializeMoveData(moveData);

        var move = clickHandler.selectPile(targetPile, game);
        move.doMove();
        expect(clickHandler.isInSelectedState()).toBe(false);
        expect(clickHandler.getCurrentMoveData()).toBe(null);
        expect(targetPile.getCards().length).toBe(1);
        expect(selectedPile.getCards().length).toBe(0);
    });

    it('should move all cards below the selected card to the new pile ensuring that the remaining top card is face up', function(){
        var faceDownTwoOfClubs = new dataApi.Card(testData.createFaceDownCard('TWO', 'CLUBS'));
        var faceDownAceOfHearts = new dataApi.Card(testData.getJsonDataForFaceDownAceOfHearts());

        var moveData = {},
            game = dataApi.Table(testData.getJsonDataForAnEmptyFullyInitalizedTable()),
            selectedPile = game.getPlayArea()[0],
            targetPile = game.getPlayArea()[1];

        selectedPile.addCard(faceDownAceOfHearts);
        selectedPile.addCard(faceDownTwoOfClubs);
        selectedPile.addCard(faceUpAceOfSpades);

        moveData.selectedCard = faceUpAceOfSpades;
        moveData.selectedPile = selectedPile;
        moveData.associatedCards = [faceUpAceOfSpades];
        moveData.game = game;

        clickHandler.initializeMoveData(moveData);

        clickHandler.selectPile(targetPile, game).doMove();

        expect(selectedPile.getCards().length).toBe(2);
        expect(targetPile.getCards().length).toBe(1);
        var testTopCard = selectedPile.getTopCard();
        expect(testTopCard.isFaceUp()).toBe(true);
        expect(selectedPile.getCards()[0].isFaceUp()).toBe(false);
    })

});
