'use strict';

const _ = require('lodash');
const log = require('console');
const colors = require('colors/safe');

module.exports = {

  options: {},

  separator: '  ',

  levels: [],

  specStarted(spec) {

    var name = spec.fullName.replace(` ${spec.description}`, '');

    this.totalSpecsExecuted++;
    _.extend(spec, {
      level: this.levels[name] || 1
    });
  },

  suiteStarted(suite) {

    var name = suite.fullName.replace(` ${suite.description}`, '');
    var level = 1;

    if(this.levels[name]) {
      level = this.levels[name] + 1;
    }
    log.log(_.repeat(this.separator, level),
      colors.gray(suite.description));

    this.levels[suite.fullName] = level;
  },

  specDone(result) {

    var self = this;
    var color = 'red';
    var symbol = '●';
    var errors;
    var space = this.separator;
    var dots = _.repeat(colors.green('▪'), result.passedExpectations.length) +
      _.repeat(colors.red('▪'), result.failedExpectations.length);

    if(result.status === 'passed') {
      color = 'green';
      symbol = '✔';
      this.totalSpecsPassed++;
    } else {
      symbol = '✘';
      this.totalSpecsFailed++;
      errors = result.failedExpectations;
    }

    //log.info(result.level);

    log.log(space,
      _.repeat(space, result.level),
      colors[color](symbol),
      result.description,
      dots);

    if(errors) {

      _.forEach(errors, error => {

        log.error(space,
          _.repeat(space, result.level),
          '↳',
          colors.red(`${error.matcherName}: ${error.message}`));

        if(self.options.includeStack === true) {

          log.error(space,
            space,
            space,
            space,
            colors.red(_.get(error, 'stack')));
        }
      });
    }
  },

  jasmineStarted(info) {
    this.hrstart = process.hrtime();
    this.levels = {};
    this.totalSpecsExecuted = 0;
    this.totalSpecsFailed = 0;
    this.totalSpecsPassed = 0;
    this.totalSpecsDefined = info.totalSpecsDefined;
    //console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
  },

  jasmineDone() {

    var hrend = process.hrtime(this.hrstart);

    log.log(this.separator);

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
