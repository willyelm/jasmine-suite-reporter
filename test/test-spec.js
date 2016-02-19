'use strict';

describe('A suite', function() {

  it('testing A', function testingA() {

    expect(true).toBe(true);
  });

  describe('B suite', function() {

    it('Testing B', function testingB() {
      expect(true).toBe(true);
    });
  });
});

describe('C suite', function() {

  it('Testing C', function testingC() {

    expect(true).toBe(true);
  });
});
