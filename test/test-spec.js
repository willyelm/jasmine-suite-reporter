'use strict';

describe('A suite', function() {

  it('testing A', function() {

    expect(true).toBe(true);
  });

  describe('B suite', function() {

    it('Testing B 1', function() {
      expect(true).toBe(true);
    });

    it('Testing B 2', function() {
      expect(true).toBe(true);
    });
  });
});

describe('C suite', function() {

  it('Testing C', function() {

    expect(true).toBe(true);
  });
});
