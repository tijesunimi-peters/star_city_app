'use strict';

describe('Service: Registrationservice', function () {

  // load the service's module
  beforeEach(module('StarcityApp'));

  // instantiate service
  var Registrationservice;
  beforeEach(inject(function (_Registrationservice_) {
    Registrationservice = _Registrationservice_;
  }));

  it('should do something', function () {
    expect(!!Registrationservice).toBe(true);
  });

});
