describe('The Rule System', function(){
    var game, _, dataAccessApi, ruleSystem;

    beforeEach(function(){
        _ = new solitaire.__();
        dataAccessApi = new solitaire.DataAccessAPI(_);
        solitaire.setLoDash(_);
        game = new dataAccessApi.Table(solitaire.createRawGame());
        ruleSystem = new solitaire.RuleSystem();
    });

    it('Should be able to wrap a move with move matchers', function(){
        var move = {};

    });
});