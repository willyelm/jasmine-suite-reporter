module.exports = function(karma){

  karma.set({
    basePath : './',
    files : [
      'test/**/*-spec.js'
    ],
    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['PhantomJS'],
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    reporters: ['suite'],
    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      require('./karma')
    ]
  });
};
