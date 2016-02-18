'use strict';

const suiteReporter = require('./reporter');

module.exports = {

  create: function() {

    return Object.create(suiteReporter);
  }
};
