describe('The Rule System', function(){
    var game, _, dataAccessApi, ruleSystem;

    beforeEach(inject(function($interpolate){
        _ = new solitaire.__();
        dataAccessApi = new solitaire.DataAccessAPI(_);
        game = new dataAccessApi.Table(solitaire.testJson.getJsonDataForFullTestGame());
        var log = {};
        log.debug = function(text){}; //no op logger

        var moveManagerStub = {
            recordMove : function(move){},
            getMoveHistory : function(){return []}
        };

        ruleSystem = new solitaire.RuleSystem(_, $interpolate, {
            MOVE_RULES : [],
            AFTER_EXECUTION_RULES : []
        }, log, moveManagerStub);
    }));

    it('should support rules to validate a move, and rules to execute after a move is completed', function(){
        var moveRules = ruleSystem.getMoveRules(),
            afterMoveRules = ruleSystem.getAfterMoveRules();
        expect(moveRules).toBeDefined();
        expect(afterMoveRules).toBeDefined();
    });

    it('should be able to construct a rule', function(){
       var rule = createTestRule(getJsonForResolutionRule());

       expect(rule).toBeDefined();
       expect(rule instanceof solitaire.Rule).toBe(true);
    });

    it('should return a pass if the rule matchers match the move matchers', function(){
        var resolutionRule = createTestRule(getJsonForResolutionRule());
        var move = createTestMove({
            targetPile : game.getPile(solitaire.RESOLUTION_PILE_NAMES[0])
        });
        var answer = resolutionRule.processMove(move);
        expect(answer).toBe(true);
    });

    it('should return a fail if the rule matchers do not match the move matchers', function(){

        var testAce = new dataAccessApi.Card(solitaire.testJson.getJsonDataForFaceUpAceOfSpades());
        game.getPile('RESOLUTION_SPADES').addCard(testAce);

        try{
            var resolutionRule = createTestRule(getJsonForResolutionRule());
            var resolutionRuleWithCountRestriction = createTestRule(getJsonForSizeBasedRule());

            var moveToPlayAreaUsingAResolutionRule = createTestMove({
                targetPile : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[0])
            });

            var moveToResolutionPileWithCard = createTestMove({
               targetPile : game.getPile('RESOLUTION_SPADES')
            });

            var moveToResolutionPileWithoutCard = createTestMove({
                targetPile : game.getPile('RESOLUTION_CLUBS')
            });

            var answer = resolutionRule.processMove(moveToPlayAreaUsingAResolutionRule);

            expect(answer).toBe(false);

            expect(resolutionRuleWithCountRestriction.processMove(moveToResolutionPileWithoutCard)).toBe(false);

            expect(resolutionRuleWithCountRestriction.processMove(moveToResolutionPileWithCard)).toBe(true);
        }finally{
            game.getPile('RESOLUTION_SPADES').removeCard(testAce);
        }
    });

    it('should be able to interpolate rule data', function(){

        var resolutionRule = createTestRule(getJsonForResolutionPileRuleWithInterpolatedString());

        var validMove = createTestMove({
            targetPile : game.getPile('RESOLUTION_SPADES'),
            selectedCard : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[6]).getTopCard()
        });

        var invalidMove = createTestMove({
            targetPile : game.getPile('RESOLUTION_HEARTS'),
            selectedCard : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[5]).getTopCard()
        });

        expect(resolutionRule.processMove(validMove)).toBe(true);
        expect(resolutionRule.processMove(invalidMove)).toBe(false);
    });

    it('should be able to handle complex matching scenarios', function(){

        var resolutionRule = createTestRule(getJsonForResolutionSpadesRule());

        var validMove = createTestMove({
            targetPile : game.getPile('RESOLUTION_SPADES'),
            selectedCard : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[6]).getTopCard()
        });

        var invalidMoveToWrongResolutionPile = createTestMove({
            targetPile : game.getPile('RESOLUTION_HEARTS'),
            selectedCard : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[6]).getTopCard()
        });

        var invalidMoveWithCorrectResolutionPileWrongSuit = createTestMove({
            targetPile : game.getPile('RESOLUTION_SPADES'),
            selectedCard : game.getPile(solitaire.PLAY_AREA_PILE_NAMES[5]).getTopCard()
        });

        expect(resolutionRule.processMove(validMove)).toBe(true);
        expect(resolutionRule.processMove(invalidMoveToWrongResolutionPile)).toBe(false);
        expect(resolutionRule.processMove(invalidMoveWithCorrectResolutionPileWrongSuit)).toBe(false);
    });

    it('Should be able to wrap a move with rule matchers', function(){
        var moveData = {};

        //this pile has a nine of spades face up as the top card
        moveData.selectedPile = game.getPile(solitaire.PLAY_AREA_PILE_NAMES[1]);
        moveData.selectedCard = moveData.selectedPile.getTopCard();
        moveData.associatedCards = [moveData.selectedPile.getTopCard()];
        //this pile has a 10 of hearts as the top card
        moveData.targetPile = game.getPile(solitaire.PLAY_AREA_PILE_NAMES[5]);

        var move =new solitaire.Move(moveData);

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

    function getJsonForResolutionSpadesRule(){
        return {
            TARGET : {
                PILE : {
                    TYPE : 'RESOLUTION',
                    SUBTYPE : 'SPADES'
                }
            },
            SELECTED : {
                CARD : {
                    SUIT : 'SPADES'
                }
            }
        };
    }


    function getJsonForResolutionPileRuleWithInterpolatedString(){
        return {
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
    }

    function getJsonForResolutionRule(){
        return  {
            TARGET : {
                PILE : {
                    TYPE : 'RESOLUTION'
                }
            }
        };
    }

    function getJsonForSizeBasedRule(){
        return {
            TARGET : {
                PILE : {
                    TYPE : 'RESOLUTION',
                    SIZE : 1
                }
            }
        }
    }

    function createTestRule(ruleJson, onSuccess, onFailure){
        return ruleSystem.createMoveRule('testRule', ruleJson, onSuccess || function(move){}, onFailure || function(move){});
    }

    function createTestMove(moveData){
        return ruleSystem.createRuleMatchersForMove(new solitaire.Move(moveData));
    }
});