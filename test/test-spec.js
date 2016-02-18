'use strict';

describe('A suite', function() {

  it('testing A', function() {

    expect(true).toBe(true);
  });

  describe('B suite', function() {

    it('Testing B', function() {
      expect(true).toBe(true);
    });
  });
});

describe('C suite', function() {

  it('Testing C', function() {

    expect(true).toBe(true);
  });
});
