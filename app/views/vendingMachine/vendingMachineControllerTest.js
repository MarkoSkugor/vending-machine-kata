'use strict';

describe('myApp.vendingmachine module', function() {

  beforeEach(module('myApp.vendingmachine'));

  describe('vendingMachineController', function(){

    it('should be defined', inject(function($controller) {
      //spec body
      var vendingMachineController = $controller('vendingMachineController');
      expect(vendingMachineController).toBeDefined();
    }));

  });
});