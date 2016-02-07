'use strict';

describe('VendingMachineService', function() {

	var quarter = {diameter: .955, weight: 5.670};
	var dime = {diameter: .705, weight: 2.268};
	var nickel = {diameter: .835, weight: 5.000};
	var penny = {diameter: .750, weight: 2.500};
	var emptyCoinsObject = {
			quarters : 0,
			dimes : 0,
			nickels : 0
		};

  	beforeEach(module('services'));

  	it('should be defined', inject(function(VendingMachineService) {
	    expect(VendingMachineService).not.toBe(null);
    }));

  	it('should have no coins inserted or stored', inject(function(VendingMachineService) {
	    expect(VendingMachineService.storedCoins).toBeDefined();
	    expect(VendingMachineService.insertedCoins).toBeDefined();
	    expect(VendingMachineService.storedCoins.quarters).toBe(0);
	    expect(VendingMachineService.storedCoins.dimes).toBe(0);
	    expect(VendingMachineService.storedCoins.nickels).toBe(0);
	    expect(VendingMachineService.insertedCoins.quarters).toBe(0);
	    expect(VendingMachineService.insertedCoins.dimes).toBe(0);
	    expect(VendingMachineService.insertedCoins.nickels).toBe(0);
    }));

  	it('should have a stocked snack array', inject(function(VendingMachineService) {
	    expect(VendingMachineService.snacks).toBeDefined();
	    expect(VendingMachineService.snacks.length).toBe(3);
    }));

	describe('insertCoin function', function() {
	  	it('should store an inserted quarter', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    expect(VendingMachineService.insertedCoins.quarters).toBe(1);
	    }));

	  	it('should store an inserted dime', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    expect(VendingMachineService.insertedCoins.dimes).toBe(1);
	    }));

	  	it('should store an inserted nickel', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.insertedCoins.nickels).toBe(1);
	    }));

	  	it('should reject an inserted penny', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(penny)).toBe(false);
	    }));
	});

	describe('dispenseSnack function', function() {
	  	it('should not dispense cola', inject(function(VendingMachineService) {
		    var preCount = VendingMachineService.snacks[0].quantity;
		    expect(VendingMachineService.dispenseSnack('cola').error).toBe(true);
		    var postCount = VendingMachineService.snacks[0].quantity;
		    expect(preCount - postCount).toBe(0);
	    }));

	  	it('should dispense a cola with no change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    var preCount = VendingMachineService.snacks[0].quantity;
		    var change = VendingMachineService.dispenseSnack('cola').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(0);
		    expect(change.nickels).toBe(0);
		    var postCount = VendingMachineService.snacks[0].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	    it('should dispense a cola with change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    var preCount = VendingMachineService.snacks[0].quantity;
		    var change = VendingMachineService.dispenseSnack('cola').change;
		    expect(change.quarters).toBe(1);
		    expect(change.dimes).toBe(0);
		    expect(change.nickels).toBe(0);
		    var postCount = VendingMachineService.snacks[0].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	  	it('should not dispense chips', inject(function(VendingMachineService) {
		    var preCount = VendingMachineService.snacks[1].quantity;
		    expect(VendingMachineService.dispenseSnack('chips').error).toBe(true);
		    var postCount = VendingMachineService.snacks[1].quantity;
		    expect(preCount - postCount).toBe(0);
	    }));

	  	it('should dispense chips with no change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(nickel);
		    var preCount = VendingMachineService.snacks[1].quantity;
		    var change = VendingMachineService.dispenseSnack('chips').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(0);
		    expect(change.nickels).toBe(0);
		    var postCount = VendingMachineService.snacks[1].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	    it('should dispense chips with change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(nickel);
		    var preCount = VendingMachineService.snacks[1].quantity;
		    var change = VendingMachineService.dispenseSnack('chips').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(1);
		    expect(change.nickels).toBe(1);
		    var postCount = VendingMachineService.snacks[1].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	  	it('should not dispense candy', inject(function(VendingMachineService) {
		    var preCount = VendingMachineService.snacks[2].quantity;
		    expect(VendingMachineService.dispenseSnack('candy').error).toBe(true);
		    var postCount = VendingMachineService.snacks[2].quantity;
		    expect(preCount - postCount).toBe(0);
	    }));

	  	it('should dispense candy with no change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(nickel);
		    var preCount = VendingMachineService.snacks[2].quantity;
		    var change = VendingMachineService.dispenseSnack('candy').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(0);
		    expect(change.nickels).toBe(0);
		    var postCount = VendingMachineService.snacks[2].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	    it('should dispense candy with change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(nickel);
		    var preCount = VendingMachineService.snacks[2].quantity;
		    var change = VendingMachineService.dispenseSnack('candy').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(1);
		    expect(change.nickels).toBe(0);
		    var postCount = VendingMachineService.snacks[2].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	    it('should dispense candy with change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(nickel);
		    VendingMachineService.insertCoin(nickel);
		    var preCount = VendingMachineService.snacks[2].quantity;
		    var change = VendingMachineService.dispenseSnack('candy').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(1);
		    expect(change.nickels).toBe(1);
		    var postCount = VendingMachineService.snacks[2].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	    it('should dispense candy with change', inject(function(VendingMachineService) {
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(quarter);
		    VendingMachineService.insertCoin(dime);
		    VendingMachineService.insertCoin(nickel);
		    VendingMachineService.insertCoin(nickel);
		    var preCount = VendingMachineService.snacks[2].quantity;
		    var change = VendingMachineService.dispenseSnack('candy').change;
		    expect(change.quarters).toBe(0);
		    expect(change.dimes).toBe(0);
		    expect(change.nickels).toBe(1);
		    var postCount = VendingMachineService.snacks[2].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	  	it('should not dispense a sold out snack', inject(function(VendingMachineService) {
		    VendingMachineService.snacks[0].quantity = 0;
		    expect(VendingMachineService.dispenseSnack('cola').error).toBe(true);
	    }));

	  	it('should not dispense a snack it does not stock', inject(function(VendingMachineService) {
		    VendingMachineService.snacks[0].quantity = 0;
		    expect(VendingMachineService.dispenseSnack('gefilte fish').error).toBe(true);
	    }));
	});

	describe('returnCoins function', function() {
	  	it('should return an inserted quarter', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.quarters).toBe(1);
	    	expect(VendingMachineService.insertedCoins.quarters).toBe(0);
	    }));

	  	it('should return an inserted dime', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.dimes).toBe(1);
	    	expect(VendingMachineService.insertedCoins.dimes).toBe(0);
	    }));

	  	it('should return an inserted nickel', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.nickels).toBe(1);
	    	expect(VendingMachineService.insertedCoins.nickels).toBe(0);
	    }));

	  	it('should return as many coins as were inserted', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.quarters).toBe(1);
		    expect(returnedCoins.dimes).toBe(2);
		    expect(returnedCoins.nickels).toBe(2);
	    	expect(VendingMachineService.insertedCoins.quarters).toBe(0);
	    	expect(VendingMachineService.insertedCoins.dimes).toBe(0);
	    	expect(VendingMachineService.insertedCoins.nickels).toBe(0);
	    }));

	  	it('should return nothing if no coins were inserted', inject(function(VendingMachineService) {
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.quarters).toBe(0);
		    expect(returnedCoins.dimes).toBe(0);
		    expect(returnedCoins.nickels).toBe(0);
	    }));
	});

	describe('determineCoinType function', function() {
	  	it('should detect a quarter', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.determineCoinType(quarter)).toBe('quarter');
	    }));

	  	it('should detect a dime', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.determineCoinType(dime)).toBe('dime');
	    }));

	  	it('should detect a nickel', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.determineCoinType(nickel)).toBe('nickel');
	    }));

	  	it('should detect a penny', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.determineCoinType(penny)).toBe('penny');
	    }));

	  	it('should not detect a weird coin', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.determineCoinType({diameter: 1.155, weight: .670})).toBe(undefined);
	    }));
	});

	describe('getSnackPrice function', function() {
	  	it('should return the price of cola', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.getSnackPrice('cola')).toBe(1);
	    }));

	  	it('should return the price of chips', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.getSnackPrice('chips')).toBe(.5);
	    }));

	  	it('should return the price of candy', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.getSnackPrice('candy')).toBe(.65);
	    }));

	  	it('should not report a price for a snack it does not stock', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.getSnackPrice('go gurt')).toBe(undefined);
	    }));
	});

	describe('getInsertedCoinsTotalValue function', function() {
	  	it('should report back 0 when there are no coins', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.getInsertedCoinsTotalValue()).toBe(0);
	    }));

	  	it('should add up to the correct amount when there are coins', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
	    	expect(VendingMachineService.getInsertedCoinsTotalValue()).toBe(.75);
	    }));
	});

	describe('needsExactChange function', function() {
	  	it('should return true when there are no coins', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.needsExactChange()).toBe(true);
	    }));

	  	it('should return false when there are enough coins', inject(function(VendingMachineService) {
		    VendingMachineService.storedCoins = {
				quarters : 0,
				dimes : 1,
				nickels : 1
			};
	    	expect(VendingMachineService.needsExactChange()).toBe(false);
	    }));

	  	it('should return true when there are no dimes', inject(function(VendingMachineService) {
		    VendingMachineService.storedCoins = {
				quarters : 1,
				dimes : 0,
				nickels : 1
			};
	    	expect(VendingMachineService.needsExactChange()).toBe(true);
	    }));

	  	it('should return true when there are no nickels', inject(function(VendingMachineService) {
		    VendingMachineService.storedCoins = {
				quarters : 1,
				dimes : 1,
				nickels : 0
			};
	    	expect(VendingMachineService.needsExactChange()).toBe(true);
	    }));
	});

});