(function(app){

    var baseServerUrl = 'http://www.clinkworks.com\:8888';
    var inDebug = false;

    var LIBRARY_PILE_NAMES = [
        'DRAW',
        'DISCARD'
    ];

    var RESOLUTION_PILE_NAMES = [
        'RESOLUTION_CLUBS',
        'RESOLUTION_HEARTS',
        'RESOLUTION_SPADES',
        'RESOLUTION_DIAMONDS'
    ];

    var PLAY_AREA_PILE_NAMES = [
        'REGULAR_1',
        'REGULAR_2',
        'REGULAR_3',
        'REGULAR_4',
        'REGULAR_5',
        'REGULAR_6',
        'REGULAR_7'
    ];

    var RANKS = ['ACE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING'];

    var SUITS = ['CLUBS', 'HEARTS', 'SPADES', 'DIAMONDS'];

    app.emptyResolutionPileCSS =  {
        RESOLUTION_CLUBS:'aceOfClubs',
        RESOLUTION_HEARTS:'aceOfHearts',
        RESOLUTION_DIAMONDS:'aceOfDiamonds',
        RESOLUTION_SPADES:'aceOfSpades'
    };

    var PILE_NAMES = [];

    var _ = new app.__();

    _.forEach(LIBRARY_PILE_NAMES, function(elm){PILE_NAMES.push(elm)});
    _.forEach(RESOLUTION_PILE_NAMES, function(elm){PILE_NAMES.push(elm)});
    _.forEach(PLAY_AREA_PILE_NAMES, function(elm){PILE_NAMES.push(elm)});

    app.constant('LIBRARY_PILE_NAMES', LIBRARY_PILE_NAMES);
    app.constant('RESOLUTION_PILE_NAMES', RESOLUTION_PILE_NAMES);
    app.constant('PLAY_AREA_PILE_NAMES', PLAY_AREA_PILE_NAMES);
    app.constant('PILE_NAMES', PILE_NAMES);
    app.constant('RANKS', RANKS);
    app.constant('SUITS', SUITS);

    app.constant('baseServerUrl', baseServerUrl);
    app.constant('inDebug', inDebug);

    app.PILE_NAMES = PILE_NAMES;
    app.PLAY_AREA_PILE_NAMES = PLAY_AREA_PILE_NAMES;
    app.LIBRARY_PILE_NAMES = LIBRARY_PILE_NAMES;
    app.RESOLUTION_PILE_NAMES = RESOLUTION_PILE_NAMES;
    app.RANKS = RANKS;
    app.SUITS = SUITS;
    app.inDebug = inDebug;
    app.baseServerUrl = baseServerUrl;

})(solitaire);
