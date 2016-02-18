'use strict';

const _ = require('lodash');
const log = require('console');
const colors = require('colors/safe');

module.exports = {

  options: {},

  specStarted: function() {
    this.totalSpecsExecuted++;
  },

  specDone: function(result) {

    var color = 'red';
    var errors;

    if(result.status === 'passed') {
      color = 'green';
      this.totalSpecsPassed++;
    } else {
      this.totalSpecsFailed++;
      errors = result.failedExpectations;
    }

    log.log(' ',
      colors[color]('●'),
      result.fullName);

    if(errors && this.options.includeStack === true) {
      log.error(' ', colors.red(_.map(errors, 'stack')));
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
