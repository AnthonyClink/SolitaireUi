module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/lodash/dist/lodash.js',
      'app/js/app.js',
      'app/js/util/**/*.js',
      'app/js/apps/platform/**/*.ja',
      'app/js/**/*.js',
      'test/unit/test-values.js',
      'app/js/app.js',


      'test/unit/**/*.js'
    ],

    exclude : [

    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})};
