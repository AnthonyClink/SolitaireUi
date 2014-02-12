(function(app){
    var _, rules;

    var Rule = function(name, data, onSuccess, onFailure){

        var localName = name;
        var localData = data;

        this.matchesMove = function(ruleMatchers){
            var currentMatcher,
                results = _.transform(localData, function(result, value, key){

                    if(!currentMatcher){
                        currentMatcher = ruleMatchers[key];
                    }

                    if(currentMatcher){
                        if(app.isString(value) && value === currentMatcher[key]){
                            results.push(true);
                        }else{
                            currentMatcher = value;
                        }
                    }

                });
            return _.reduce(results, function(answer){
                return answer === true;
            });
        };
    };

    var RuleSystem = function(__, gameRules){
        _ = __,
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