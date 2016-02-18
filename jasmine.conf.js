'use strict';

const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SuiteReporter = require('./reporter/index');

//Jasmine Configuration
jasmine.loadConfig({
  spec_dir: 'test',
  spec_files: [
    '**/*-spec.js'
  ],
  stopSpecOnExpectationFailure: false,
  random: false
});

//Register Reporter
jasmine.addReporter(SuiteReporter.create({
  includeStack: true
}));
//Jasmine Start
jasmine.execute();
