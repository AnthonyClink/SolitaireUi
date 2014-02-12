describe('The Rule System', function(){
    var game, _, dataAccessApi, ruleSystem;

    beforeEach(function(){
        _ = new solitaire.__();
        dataAccessApi = new solitaire.DataAccessAPI(_);
        solitaire.setLoDash(_);
        game = new dataAccessApi.Table(solitaire.createRawGame());
        ruleSystem = new solitaire.RuleSystem(_, {
            MOVE_RULES : [],
            AFTER_EXECUTION_RULES : []
        });
    });

    it('should support rules to validate a move, and rules to execute after a move is completed', function(){
        var moveRules = ruleSystem.getMoveRules(),
            afterMoveRules = ruleSystem.getAfterMoveRules();
        expect(moveRules).toBeDefined();
        expect(afterMoveRules).toBeDefined();
    });

    it('should be able to construct a rule', function(){
       var rule = ruleSystem.createMoveRule('TO_RESOLUTION', {
           TARGET : {
               PILE : {
                   TYPE : 'RESOLUTION'
               }
           }
       });

       expect(rule).toBeDefined();
       expect(rule instanceof solitaire.Rule).toBe(true);
    });

    it('should return a pass if the rule matchers match the move matchers', function(){
        var resolutionRule = getResolutionRule();
        var move = ruleSystem.createRuleMatchersForMove({
            targetPile : game.getPile(solitaire.RESOLUTION_PILE_NAMES[0])
        });
        var answer = resolutionRule.validateMove(move);
        expect(answer).toBe(true);
    });

    it('should return a fail if the rule matchers do not match the move matchers', function(){
        var resolutionRule = getResolutionRule();
        var move = ruleSystem.createRuleMatchersForMove({
            targetPile : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[0])
        });
        var answer = resolutionRule.validateMove(move);
        expect(answer).toBe(false);
    });


    it('Should be able to wrap a move with rule matchers', function(){
        var move = {};

        //this pile has a nine of spades face up as the top card
        move.selectedPile = game.getPile(solitaire.PLAY_AREA_PILE_NAMES[1]);
        move.selectedCard = move.selectedPile.getTopCard();
        move.associatedCards = [move.selectedPile.getTopCard()];
        //this pile has a 10 of hearts as the top card
        move.targetPile = game.getPile(solitaire.PLAY_AREA_PILE_NAMES[5]);

        var matchers = ruleSystem.createRuleMatchersForMove(move);

        expect(matchers.TARGET.PILE.TYPE).toBe('REGULAR');
        expect(matchers.TARGET.PILE.NAME).toBe('REGULAR_6');
        expect(matchers.TARGET.PILE.SUBTYPE).toBe('6');
        expect(matchers.TARGET.PILE.SIZE).toBe(6);

        expect(matchers.TARGET.CARD.SUIT).toBe('HEARTS');
        expect(matchers.TARGET.CARD.RANK).toBe('TEN');

        expect(matchers.SELECTED.PILE.TYPE).toBe('REGULAR');
        expect(matchers.SELECTED.PILE.NAME).toBe('REGULAR_2');
        expect(matchers.SELECTED.PILE.SUBTYPE).toBe('2');
        expect(matchers.SELECTED.PILE.SIZE).toBe(2);

        expect(matchers.SELECTED.CARD.SUIT).toBe('SPADES');
        expect(matchers.SELECTED.CARD.RANK).toBe('NINE');

        expect(matchers.SELECTED.ASSOCIATED_CARDS.length).toBe(1);
        expect(matchers.SELECTED.ASSOCIATED_CARDS[0].RANK).toBe('NINE');
        expect(matchers.SELECTED.ASSOCIATED_CARDS[0].SUIT).toBe('SPADES');
    });

    function getResolutionRule(){
        return ruleSystem.createMoveRule('TO_RESOLUTION', {
            TARGET : {
                PILE : {
                    TYPE : 'RESOLUTION'
                }
            }
        });
    }

});