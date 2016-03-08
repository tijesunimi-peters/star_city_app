'use strict';

describe('Directive: ngThumb.js', function () {

  // load the directive's module
  beforeEach(module('publicApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-thumb.js></ng-thumb.js>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngThumb.js directive');
  }));
});
