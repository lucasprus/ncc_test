'use strict';

/* jasmine specs for services go here */

describe('service', function () {
  beforeEach(module('myApp.services'));

  describe('version', function () {
    it('should return current version', inject(function (version) {
      expect(version).toEqual('0.1');
    }));
  });

  describe('SampleGenerator', function () {
    it('should return a sample of size 5', inject(function (SampleGenerator) {

      expect(SampleGenerator.exponential(5, 0).length).toEqual(0);
      expect(SampleGenerator.uniform(-20, -10, 0).length).toEqual(0);
      expect(SampleGenerator.normal(0).length).toEqual(0);

      expect(SampleGenerator.exponential(5, 20).length).toEqual(20);
      expect(SampleGenerator.uniform(-20, -10, 100).length).toEqual(100);
      expect(SampleGenerator.normal(5).length).toEqual(5);

    }));
  });

});
