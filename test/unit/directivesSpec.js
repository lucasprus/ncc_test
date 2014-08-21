'use strict';

/* jasmine specs for directives go here */

describe('directives', function () {
  beforeEach(module('myApp.directives'));

  xdescribe('app-version', function () {
    it('should print current version', function () {
      module(function ($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function ($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });

  xdescribe('my-test', function () {
    var element, scope;

    it('should replace html', function () {

      inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        scope.bins = 100;
        scope.histogramData = [3, 4, 5];
        element = $compile('<span my-test bins="bins" histogram-data="histogramData"></span>')(scope);
        scope.$digest();
        expect(element.text()).toEqual('100--3');
      });

    });

  });

  describe('d3-histogram', function () {
    var element, scope, datum = {
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
        responseTimes: '1 2 3 5 4 3'
      };

    describe('for 20 bins', function () {

      beforeEach(function () {
        inject(function ($compile, $rootScope) {
          scope = $rootScope.$new();
          scope.bins = 20;
          scope.datum = datum
          element = $compile('<span d3-histogram bins="bins" histogram-data="datum"></span>')(scope);
          scope.$digest();
        });
      });

      it('should draw 20 bars and two axis', function () {
        expect(element.children().length).toEqual(22);
      });

      it('should draw bars approximately 22px wide', function () {
        expect(parseFloat(element.find('rect').eq(0).attr('width'))).toBeCloseTo(22.0);
      });

    });

    describe('for 10 bins', function () {

      beforeEach(function () {
        inject(function ($compile, $rootScope) {
          scope = $rootScope.$new();
          scope.bins = 10;
          scope.datum = datum;
          element = $compile('<span d3-histogram bins="bins" histogram-data="datum"></span>')(scope);
          scope.$digest();
        });
      });

      it('should draw 10 bars and two axis', function () {
        expect(element.children().length).toEqual(12);
      });

      it('should draw bars approximately 44px wide', function () {
        expect(parseFloat(element.find('rect').eq(0).attr('width'))).toBeCloseTo(44.0);
      });      

    });

    describe('for undefined datum', function () {

      beforeEach(function () {
        inject(function ($compile, $rootScope) {
          scope = $rootScope.$new();
          scope.bins = 10;
          element = $compile('<span d3-histogram bins="bins" histogram-data="datum"></span>')(scope);
          scope.$digest();
        });
      });

      it('should not draw anything', function () {
        expect(element.children().length).toEqual(0);
      });

    });

    describe('for undefined bins', function () {

      beforeEach(function () {
        inject(function ($compile, $rootScope) {
          scope = $rootScope.$new();
          scope.datum = datum;
          element = $compile('<span d3-histogram bins="bins" histogram-data="datum"></span>')(scope);
          scope.$digest();
        });
      });

      it('should not draw anything', function () {
        expect(element.children().length).toEqual(0);
      });

    });

  });

});
