describe('The Click Handler API', function(){

   var clickHandler, scope, testData, dataApi, _, faceUpAceOfSpades, faceUpAceOfHearts;

    beforeEach(function(){

        scope = {};

        testData = solitaire.testJson;

        _ = new solitaire.__();

        solitaire.setLoDash(_);

        dataApi = new solitaire.DataAccessAPI(_);

        var aceOSpades = testData.getJsonDataForFaceUpAceOfSpades();

        faceUpAceOfSpades = new dataApi.Card(aceOSpades);

        var heartData = testData.getJsonDataForFaceDownAceOfHearts();
        heartData.cardState = 'FACE_UP';

        faceUpAceOfHearts = new dataApi.Card(heartData);

        clickHandler = new solitaire.ClickToMoveHandler(scope);

    });

    it('can initialize the scopes selected state', function(){
        expect(scope.selectedCard).toBeDefined();
        expect(scope.inSelectedState).toBeDefined();
       expect(scope.selectedCard).toBe(null);
       expect(scope.inSelectedState()).toBe(false);
    });

    it('responds to click events and allows the scope to be updated with selected state and provides scope with knowlege about the selected card', function(){
        var card = faceUpAceOfSpades;
        var pile1 = new dataApi.Pile('testPile', testData.getJsonDataForAnEmptyPile());
        pile1.addCard(card);
        clickHandler.selectCard(pile1, card);
        expect(scope.selectedCard).toBe(card);
        expect(scope.inSelectedState()).toBe(true);
    });

    it('should attempt to move the selected card to the newly selected pile', function(){
        var card = faceUpAceOfSpades;
        scope.selectedCard = card;
        clickHandler.selectedState = true;

        var selectedPile = new dataApi.Pile('testPile', testData.getJsonDataForAnEmptyPile());
        var targetPile = new dataApi.Pile('testPile2', testData.getJsonDataForAnEmptyPile());

        selectedPile.addCard(card);

        scope.selectedPile = selectedPile;

        clickHandler.selectPile(targetPile);

        expect(scope.selectedCard).toBeNull();
        expect(scope.inSelectedState()).toBe(false);
        expect(targetPile.getCards().length).toBe(1);
        expect(scope.selectedPile).toBeNull();
        expect(selectedPile.getCards().length).toBe(0);
    });

    it('should move all cards below the selected card to the new pile', function(){
        var card = faceUpAceOfSpades;
        var card2 = faceUpAceOfHearts;

        scope.selectedCard = card;
        clickHandler.selectedState = true;

        var selectedPile = new dataApi.Pile('testPile', testData.getJsonDataForAnEmptyPile());
        var targetPile = new dataApi.Pile('testPile2', testData.getJsonDataForAnEmptyPile());

        selectedPile.addCard(new dataApi.Card(testData.createFaceUpCard('ACE', 'DIAMONDS')));
        selectedPile.addCard(card);
        selectedPile.addCard(card2);

        scope.selectedPile = selectedPile;

        clickHandler.selectPile(targetPile);

        expect(selectedPile.getCards().length).toBe(1);
        expect(targetPile.getCards().length).toBe(2);
        expect(targetPile.getTopCard()).toBe(card2);
        expect(targetPile.getCards()[0]).toBe(card);
    })

});
