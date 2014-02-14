(function(app){
    var _,
        interpolate,
        rules;

    var Rule = function(name, data, onSuccess, onFailure){

        var localName = name;
        var localData = data;

        var matchKey = function(results, ruleMatchers, currentRuleMatcher, currentMoveMatcher, expectedCondition, conditionString){

            if(!conditionString){
                conditionString = expectedCondition;
            }else{
                conditionString += '.' + expectedCondition;
            }

            if(!currentRuleMatcher){
                currentRuleMatcher = ruleMatchers;
            }

            if(currentRuleMatcher && angular.isString(currentMoveMatcher)){
                conditionString += '=' + currentMoveMatcher;
                var currentRuleMatcher = currentRuleMatcher[expectedCondition];
                if(_.contains(currentMoveMatcher, '{{') && _.contains(currentMoveMatcher, '}}')){
                    currentMoveMatcher = interpolate(currentMoveMatcher)(ruleMatchers);
                }
                results.push({condition: conditionString, pass: currentRuleMatcher === currentMoveMatcher});
            }else{
                _.forOwn(currentMoveMatcher, function(newMoveMatcher, newCondition){
                    matchKey(results, ruleMatchers, currentRuleMatcher[expectedCondition], newMoveMatcher, newCondition, conditionString);
                });
            }

            return results;
        };

        this.processMove = function(ruleMatchers){
            var results = [];

            _.forOwn(localData, function(moveMatcher, condition){

                matchKey(results, ruleMatchers, undefined, moveMatcher, condition);

            });

            var succeeded = !_.contains(_.map(results, function(result){return result.pass}), false);

            if(succeeded){
                if(onSuccess){
                    onSuccess(localData.MOVE);
                }else{
                    localData.MOVE.doMove();
                }
            }else{
                if(onFailure){
                    onFailure(localData.MOVE);
                }
            }

            return succeeded;
        };
    };

    var RuleSystem = function(__, $interpolate, gameRules){
        _ = __;
        rules = gameRules;
        interpolate = $interpolate;

        var createMoveRule = function(name, rule, onSuccess, onFailure){
            return new Rule(name, rule, onSuccess, onFailure);
        };

        var createRuleMatchersForMove = function(move){
            return {
                MOVE : move,
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

        function createPileData(pile){
            return pile ? {
                TYPE : pile.getType(),
                NAME : pile.getName(),
                SUBTYPE : pile.getSubType(),
                SIZE : pile.getSize()
            } : undefined;
        }

        function createCardData(card){
            return card ? card.getRank() === 'BLANK' ? undefined : {
                SUIT : card.getSuit(),
                RANK : card.getRank()
            } : undefined;
        }

        return {
            createRuleMatchersForMove : createRuleMatchersForMove,
            getMoveRules : function(){return rules.MOVE_RULES},
            getAfterMoveRules : function(){return rules.AFTER_EXECUTION_RULES},
            createMoveRule : createMoveRule
        }
    };

    app.Rule = Rule;
    app.RuleSystem = RuleSystem;
    app.factory('ruleSystem', ['$interpolate', RuleSystem]);

})(solitaire);