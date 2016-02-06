'use strict';

describe('VendingMachineService', function() {

  	beforeEach(module('services'));

  	it('should be defined', inject(function(VendingMachineService) {
	    expect(VendingMachineService).not.toBe(null);
    }));

  	it('should have an empty coin array', inject(function(VendingMachineService) {
	    expect(VendingMachineService.coins).toBeDefined();
	    expect(VendingMachineService.coins.length).toBe(0);
    }));

  	it('should have a stocked snack array', inject(function(VendingMachineService) {
	    expect(VendingMachineService.snacks).toBeDefined();
	    expect(VendingMachineService.snacks.length).toBe(3);
    }));

	describe('insertCoin function', function() {
		//TODO: test the insertCoin function
	});

	describe('dispenseSnack function', function() {
		//TODO: test the dispenseSnack function
	});

	describe('returnCoins function', function() {
		//TODO: test the returnCoins function
	});

	describe('determineCoinType function', function() {
		//TODO: test the determineCoinType function
	});

});