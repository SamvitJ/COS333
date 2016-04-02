module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'client/js/*.js',
      'client/js/controllers/*.js',
      'test/unit/**/*.js',
      {pattern: 'client/views/**', watched: false, included: false, served: true}
    ],

    exclude: [
      'client/js/demo.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'browserify'],

    browsers : ['Chrome'/*, 'Firefox'*/],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-browserify'
            ],

    preprocessors : {
      'test/unit/**/*.js': [ 'browserify' ]
    },

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
