'use strict';

describe('Directive: fileThumb.js', function () {

  // load the directive's module
  beforeEach(module('StarCityApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<file-thumb.js></file-thumb.js>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fileThumb.js directive');
  }));
});
