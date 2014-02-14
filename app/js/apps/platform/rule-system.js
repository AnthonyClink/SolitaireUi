(function(app){
    var _,
        interpolate,
        moveRules,
        afterMoveRules,
        log,
        logName = 'platform.RuleSystem: ';

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
                var currentRuleMatcher = currentRuleMatcher[expectedCondition];
                if(_.contains(currentMoveMatcher, '{{') && _.contains(currentMoveMatcher, '}}')){
                    currentMoveMatcher = interpolate(currentMoveMatcher)(ruleMatchers);
                }
                conditionString += '=' + currentMoveMatcher;

                results.push({condition: conditionString, pass: currentRuleMatcher === currentMoveMatcher});
            }else{
                _.forOwn(currentMoveMatcher, function(newMoveMatcher, newCondition){
                    matchKey(results, ruleMatchers, currentRuleMatcher[expectedCondition], newMoveMatcher, newCondition, conditionString);
                });
            }

            info(angular.toJson(results));
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
                    onSuccess(ruleMatchers.MOVE);
                }else{
                    ruleMatchers.MOVE.doMove();
                }
            }else{
                if(onFailure){
                    onFailure(ruleMatchers.MOVE);
                }
            }

            return succeeded;
        };
    };

    var RuleSystem = function(__, $interpolate, ruleData, $log){
        _ = __;
        moveRules = [];
        afterMoveRules = [];
        interpolate = $interpolate;
        log = $log;

        _.forEach(ruleData.MOVE_RULES, function(data){
            moveRules.push(createMoveRule(data.name || undefined, data, data.onSuccess || undefined, data.onFailure || undefined));
        });

        function createMoveRule(name, ruleData, onSuccess, onFailure){
            return new Rule(name, ruleData, onSuccess, onFailure);
        };

        function createRuleMatchersForMove(move){
            return {
                MOVE : move,
                TARGET : {
                    PILE : createPileData(move.getTargetPile()),
                    CARD : createCardData(move.getTargetPile() ? move.getTargetPile().getTopCard() : undefined)
                },
                SELECTED : {
                    PILE : createPileData(move.getSelectedPile()),
                    CARD : createCardData(move.getSelectedCard()),
                    ASSOCIATED_CARDS : _.map(move.getAssociatedCards(), function(card){return createCardData(card)})
                }
            };
        }

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
                RANK : card.getRank(),
                COLOR : card.getColor(),
                OPPOSITE_COLOR : card.getColor() === 'RED' ? 'BLACK' : 'RED',
                VALUE : card.getValue()
            } : undefined;
        }

        function processMove(move){
            var moveData = createRuleMatchersForMove(move);

            _.forEach(moveRules, function(rule){
               rule.processMove(moveData);
            });

            _.forEach(afterMoveRules, function(rule){
                rule.processMove(moveData);
            });
        }

        return {
            createRuleMatchersForMove : createRuleMatchersForMove,
            getMoveRules : function(){return moveRules},
            getAfterMoveRules : function(){return afterMoveRules},
            processMove : processMove,
            createMoveRule : createMoveRule
        }
    };

    function info(message){
        log.info(logName + message);
    }

    app.Rule = Rule;
    app.RuleSystem = RuleSystem;
    app.factory('ruleSystem', ['_', '$interpolate', 'rules', '$log', RuleSystem]);

})(solitaire);