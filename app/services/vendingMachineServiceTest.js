'use strict';

describe('VendingMachineService', function() {

	var quarter = {diameter: .955, weight: 5.670};
	var dime = {diameter: .705, weight: 2.268};
	var nickel = {diameter: .835, weight: 5.000};
	var penny = {diameter: .750, weight: 2.500};

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
	  	it('should store an inserted quarter', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    expect(VendingMachineService.coins.length).toBe(1);
	    }));

	  	it('should store an inserted dime', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    expect(VendingMachineService.coins.length).toBe(2);
	    }));

	  	it('should store an inserted nickel', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.coins.length).toBe(3);
	    }));

	  	it('should reject an inserted penny', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(penny)).toBe(false);
		    expect(VendingMachineService.coins.length).toBe(3);
	    }));
	});

	describe('dispenseSnack function', function() {
	  	it('should dispense a cola', inject(function(VendingMachineService) {
		    var preCount = VendingMachineService.snacks[0].quantity;
		    expect(VendingMachineService.dispenseSnack('cola')).toBe(true);
		    var postCount = VendingMachineService.snacks[0].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	  	it('should dispense some chips', inject(function(VendingMachineService) {
		    var preCount = VendingMachineService.snacks[1].quantity;
		    expect(VendingMachineService.dispenseSnack('chips')).toBe(true);
		    var postCount = VendingMachineService.snacks[1].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	  	it('should dispense some candy', inject(function(VendingMachineService) {
		    var preCount = VendingMachineService.snacks[2].quantity;
		    expect(VendingMachineService.dispenseSnack('candy')).toBe(true);
		    var postCount = VendingMachineService.snacks[2].quantity;
		    expect(preCount - postCount).toBe(1);
	    }));

	  	it('should not dispense a sold out snack', inject(function(VendingMachineService) {
		    VendingMachineService.snacks[0].quantity = 0;
		    expect(VendingMachineService.dispenseSnack('cola')).toBe(false);
	    }));

	  	it('should not dispense a snack it does not stock', inject(function(VendingMachineService) {
		    VendingMachineService.snacks[0].quantity = 0;
		    expect(VendingMachineService.dispenseSnack('gefilte fish')).toBe(false);
	    }));
	});

	describe('returnCoins function', function() {
	  	it('should return an inserted quarter', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.length).toBe(1);
	    	expect(VendingMachineService.coins.length).toBe(0);
		    expect(returnedCoins[0].diameter).toBe(quarter.diameter);
		    expect(returnedCoins[0].weight).toBe(quarter.weight);
	    }));

	  	it('should return an inserted dime', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.length).toBe(1);
	    	expect(VendingMachineService.coins.length).toBe(0);
		    expect(returnedCoins[0].diameter).toBe(dime.diameter);
		    expect(returnedCoins[0].weight).toBe(dime.weight);
	    }));

	  	it('should return an inserted nickel', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.length).toBe(1);
	    	expect(VendingMachineService.coins.length).toBe(0);
		    expect(returnedCoins[0].diameter).toBe(nickel.diameter);
		    expect(returnedCoins[0].weight).toBe(nickel.weight);
	    }));

	  	it('should return as many coins as were inserted', inject(function(VendingMachineService) {
		    expect(VendingMachineService.insertCoin(quarter)).toBe(true);
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.insertCoin(nickel)).toBe(true);
		    expect(VendingMachineService.insertCoin(dime)).toBe(true);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.length).toBe(5);
	    	expect(VendingMachineService.coins.length).toBe(0);
	    }));

	  	it('should return nothing if no coins were inserted', inject(function(VendingMachineService) {
	    	expect(VendingMachineService.coins.length).toBe(0);
		    var returnedCoins = VendingMachineService.returnCoins();
		    expect(returnedCoins.length).toBe(0);
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

});