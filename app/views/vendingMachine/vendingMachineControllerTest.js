'use strict';

describe('myApp.vendingmachine module', function() {

	var vendingMachineController;
	var mockVendingMachineService = {};

  	beforeEach(module('myApp.vendingmachine'));
  	beforeEach(inject(function($controller){
  		vendingMachineController = $controller('vendingMachineController', {$scope: {}, VendingMachineService : mockVendingMachineService});
  	}));

  	describe('vendingMachineController', function(){

	    it('should be defined', function(){
	      	expect(vendingMachineController).toBeDefined();
	    });

  	});
});