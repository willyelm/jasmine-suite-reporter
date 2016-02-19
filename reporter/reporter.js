'use strict';

const _ = require('lodash');
const log = require('console');
const colors = require('colors');

module.exports = {

  options: {},

  specStarted: function() {
    this.totalSpecsExecuted++;
  },

  specDone: function(result) {

    var self = this;
    var color = 'red';
    var space = ' ';
    var symbol = '●';
    var errors;

    if(result.status === 'passed') {
      color = 'green';
      symbol = '✔';
      this.totalSpecsPassed++;
    } else {
      symbol = '✘';
      this.totalSpecsFailed++;
      errors = result.failedExpectations;
    }

    log.log(space,
      colors[color](symbol),
      result.fullName);

    if(errors) {
      _.forEach(errors, function(error) {

        log.error(space, space, '↳', colors.red(_.get(error, 'message')));

        if(self.options.includeStack === true) {
          log.error(space, space, space, colors.red(_.get(error, 'stack')));
        }
      });
    }
  },

  jasmineStarted: function(info) {
    this.hrstart = process.hrtime();
    this.totalSpecsExecuted = 0;
    this.totalSpecsFailed = 0;
    this.totalSpecsPassed = 0;
    this.totalSpecsDefined = info.totalSpecsDefined;
    //console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
  },

  jasmineDone: function() {
    var hrend = process.hrtime(this.hrstart);

    log.log('Executed %d of %d (%d secs)',
      this.totalSpecsExecuted,
      this.totalSpecsDefined,
      hrend[1]/1000000000);

    if(this.totalSpecsFailed > 0) {

      log.error(colors.red('TOTAL: %d %s %d %s'),
        this.totalSpecsPassed,
        'SUCCESS',
        this.totalSpecsFailed,
        'FAILED');
    } else {

      log.info(colors.green('TOTAL: %d %s'),
        this.totalSpecsPassed,
        'SUCCESS');
    }

  }
};
