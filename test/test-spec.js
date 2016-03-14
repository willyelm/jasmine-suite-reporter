'use strict';

describe('A: Test a features', function() {

  it('testing A', function testingA() {

    expect(true).toBe(true);
  });

  describe('B: Access b features', function() {

    it('Testing B 1', function testingB() {
      expect(true).toBe(true);
      expect(true).toBe(true);
    });
    it('Testing B 2', function testingB() {
      expect(true).toBe(true);
    });
  });

  describe('C: Access c features', function() {

    it('Testing C', function testingB() {
      expect(true).toBe(true);
    });

    describe('D: Access d features', function() {

      it('Testing D', function testingB() {
        expect(true).toBe(true);
      });
    });
  });
});

describe('E: Suite to test c operations', function() {

  it('Testing E', function testingC() {

    expect(true).toBe(true);
  });
});
