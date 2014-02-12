(function(app){
    var _, rules;

    var Rule = function(name, data, onSuccess, onFailure){

        var localName = name;
        var localData = data;

        var matchKey = function(results, ruleMatchers, currentRuleMatcher, currentMoveMatcher, expectedCondition){

            if(!currentRuleMatcher){
                currentRuleMatcher = ruleMatchers;
            }

            if(currentRuleMatcher && angular.isString(currentMoveMatcher)){
                results.push(currentRuleMatcher[expectedCondition] === currentMoveMatcher);
            }else{
                _.forOwn(currentMoveMatcher, function(newMoveMatcher, newCondition){
                    matchKey(results, ruleMatchers, currentRuleMatcher[expectedCondition], newMoveMatcher, newCondition);
                });
            };

            return results;
        };

        /*

         TARGET : {
         PILE : {
         TYPE : 'RESOLUTION'
         }
         }

         */

        this.validateMove = function(ruleMatchers){
            var results = [];

            _.forOwn(localData, function(expectedValue, condition){

                matchKey(results, ruleMatchers, undefined, expectedValue, condition);

            });

            return !_.contains(results, false);
        };
    };

    var RuleSystem = function(__, gameRules){
        _ = __;
        rules = gameRules;

        var createPileData = function(pile){
          return pile ? {
              TYPE : pile.getType(),
              NAME : pile.getName(),
              SUBTYPE : pile.getSubType(),
              SIZE : pile.getSize()
          } : undefined;
        };

        var createCardData = function(card){
            return card ? card.getRank() === 'BLANK' ? undefined : {
                SUIT : card.getSuit(),
                RANK : card.getRank()
            } : undefined;
        };

        var createMoveRule = function(name, rule){
            return new Rule(name, rule, function(){}, function(){});
        };

        var createRuleMatchersForMove = function(move){
            return {
                TARGET : {
                    PILE : createPileData(move.targetPile),
                    CARD : createCardData(move.targetPile ? move.targetPile.getTopCard() : undefined)
                },
                SELECTED : {
                    PILE : createPileData(move.selectedPile),
                    CARD : createCardData(move.selectedCard),
                    ASSOCIATED_CARDS : _.map(move.associatedCards, function(card){return createCardData(card)})
                }
            };
        };

        return {
            createRuleMatchersForMove : createRuleMatchersForMove,
            getMoveRules : function(){return rules.MOVE_RULES},
            getAfterMoveRules : function(){return rules.AFTER_EXECUTION_RULES},
            createMoveRule : createMoveRule
        }
    };

    app.Rule = Rule;
    app.RuleSystem = RuleSystem;
    app.factory('ruleSystem', [RuleSystem]);

})(solitaire);