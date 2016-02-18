'use strict';

const suiteReporter = require('./reporter');
const _ = require('lodash');

module.exports = {
  create: function(options) {

    var reporter = Object.create(suiteReporter);

    reporter.options = _.defaults(options, {
      includeStack: false
    });

    return reporter;
  }
};
