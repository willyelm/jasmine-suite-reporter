'use strict';

const log = require('console');
const colors = require('colors/safe');
const _ = require('lodash');

var SuiteReporter = function(baseReporterDecorator) {

  baseReporterDecorator(this);

  this.levels = [];
  this.separator = '  ';
  this.showSuite = function(suites){

    var levels = _.clone(suites);
    var level = levels.length;
    var description;

    _.forEach(levels, suite => {

      if(!this.levels[suite]){
        description = suite;
        this.levels[suite] = level;
        levels.unshift();
      }
    });

    if(description){
      log.log(_.repeat(this.separator, level),
        colors.gray(description));
    }

    return level;
  };

  this.onBrowserError = function(browser, error){
    log.error(colors.red(error));
  };

  this.onSpecComplete = function(browser, result){

    var level = this.showSuite(result.suite);
    var symbol = '●';
    var color = 'red';

    if(result.success) {
      color = 'green';
      symbol = '✔';
    } else if(result.skipped === true) {
      color = 'yellow';
    } else {
      symbol = '✘';
    }

    log.log(this.separator,
      _.repeat(this.separator, level),
      colors[color](symbol),
      result.description);

    _.forEach(result.log, error => {

      log.log(this.separator,
        _.repeat(this.separator, level),
        '↳',
        colors.red(error));
    });
  };

};

SuiteReporter.$inject = ['baseReporterDecorator'];

module.exports = {
  'reporter:suite': [
    'type',
    SuiteReporter
  ]
};
