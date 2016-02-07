'use strict';

describe('myApp.vendingmachine module', function() {

	var vendingMachineController;
	var mockVendingMachineService = {
		insertCoin : function(){},
		dispenseSnack : function(){},
		returnCoins : function(){},
		getInsertedCoinsTotalValue : function(){},
		determineCoinType : function(){},
		needsExactChange : function(){}
	};
	var $scope = {};

  	beforeEach(module('myApp.vendingmachine'));
  	beforeEach(inject(function($controller){
  		vendingMachineController = $controller('vendingMachineController', {$scope: $scope, VendingMachineService : mockVendingMachineService});
  	}));

  	describe('vendingMachineController', function(){

	    it('should be defined', function(){
	      	expect(vendingMachineController).toBeDefined();
	    });

	  	describe('insertCoin function', function(){
	  		it('should accept a quarter', function(){
	  			mockVendingMachineService.getInsertedCoinsTotalValue = function(){ return 1 };
	  			mockVendingMachineService.determineCoinType = function(){ return 'quarter' };
	  			spyOn(mockVendingMachineService, 'insertCoin');
	  			$scope.insertCoin({'diameter' : .955, 'weight' : 5.670});
	  			expect(mockVendingMachineService.insertCoin).toHaveBeenCalled();
		    });

	  		it('should accept a dime', function(){
	  			mockVendingMachineService.getInsertedCoinsTotalValue = function(){ return 1 };
	  			mockVendingMachineService.determineCoinType = function(){ return 'dime' };
	  			spyOn(mockVendingMachineService, 'insertCoin');
	  			$scope.insertCoin({'diameter' : .705, 'weight' : 2.268});
	  			expect(mockVendingMachineService.insertCoin).toHaveBeenCalled();
		    });	

	  		it('should accept a nickel', function(){
	  			mockVendingMachineService.getInsertedCoinsTotalValue = function(){ return 1 };
	  			mockVendingMachineService.determineCoinType = function(){ return 'nickel' };
	  			spyOn(mockVendingMachineService, 'insertCoin');
	  			$scope.insertCoin({'diameter' : .835, 'weight' : 5.000});
	  			expect(mockVendingMachineService.insertCoin).toHaveBeenCalled();
		    });	

	  		it('should reject a penny and put it in the coin return', function(){
	  			mockVendingMachineService.getInsertedCoinsTotalValue = function(){ return 1 };
	  			mockVendingMachineService.determineCoinType = function(){ return 'penny' };
	  			spyOn(mockVendingMachineService, 'insertCoin');
	  			$scope.insertCoin({'diameter' : .750, 'weight' : 2.500});
	  			expect(mockVendingMachineService.insertCoin).not.toHaveBeenCalled();
		    });	
	  	});

	  	describe('clearCoinReturn function', function(){
	  		it('should reset all coins in the coin return to 0', function(){
	  			$scope.coinReturn = {
					quarters : 5,
					dimes : 3,
					nickels : 7,
					pennies : 12
				};

				$scope.clearCoinReturn();

				expect($scope.coinReturn.quarters).toBe(0);
				expect($scope.coinReturn.dimes).toBe(0);
				expect($scope.coinReturn.nickels).toBe(0);
				expect($scope.coinReturn.pennies).toBe(0);
		    });	
	  	});

	  	describe('returnCoins function', function(){
	  		it('should add returned coins to the coin return', function(){
	  			mockVendingMachineService.returnCoins = function(){
	  				return {
						quarters : 3,
						dimes : 8,
						nickels : 9
	  				};
	  			};

	  			$scope.coinReturn = {
					quarters : 1,
					dimes : 10,
					nickels : 4,
					pennies : 7
				};

				$scope.returnCoins();

				expect($scope.coinReturn.quarters).toBe(4);
				expect($scope.coinReturn.dimes).toBe(18);
				expect($scope.coinReturn.nickels).toBe(13);
				expect($scope.coinReturn.pennies).toBe(7);
		    });	
	  	});

	  	describe('selectSnack function', function(){
	  		it('should call the vending machine service with the selected snack name', function(){
	  			mockVendingMachineService.dispenseSnack = function(){
	  				return {
	  					message : "THANK YOU",
	  					change : {
							quarters : 0,
							dimes : 0,
							nickels : 0
	  					}
	  				};
	  			};
	  			spyOn(mockVendingMachineService, 'dispenseSnack').and.callThrough();
	  			$scope.selectSnack('cola');
	  			expect(mockVendingMachineService.dispenseSnack).toHaveBeenCalledWith('cola');
		    });	

		    it('should dispense change from a successful snack dispense and update the message', function(){
	  			mockVendingMachineService.dispenseSnack = function(){
	  				return {
	  					message : "THANK YOU",
	  					change : {
							quarters : 0,
							dimes : 1,
							nickels : 1
	  					}
	  				};
	  			};

				$scope.coinReturn = {
					quarters : 0,
					dimes : 0,
					nickels : 0,
					pennies : 1
				};

				$scope.selectSnack('cola');

	  			expect($scope.screenMessage).toBe('THANK YOU');
	  			expect($scope.coinReturn.quarters).toBe(0);
	  			expect($scope.coinReturn.dimes).toBe(1);
	  			expect($scope.coinReturn.nickels).toBe(1);
	  			expect($scope.coinReturn.pennies).toBe(1);
		    });	

		    it('should update the message when not enough coins have been inserted', function(){
	  			mockVendingMachineService.dispenseSnack = function(){
	  				return {
	  					message : "PRICE: $0.50",
	  					error : true
	  				};
	  			};

				$scope.selectSnack('chips');

				expect($scope.screenMessage).toBe('PRICE: $0.50');
		    });	

		    it('should update the message when a snack has been sold out', function(){
	  			mockVendingMachineService.dispenseSnack = function(){
	  				return {
	  					message : "SOLD OUT",
	  					error : true
	  				};
	  			};

				$scope.selectSnack('candy');

				expect($scope.screenMessage).toBe('SOLD OUT');
		    });	
	  	});

  	});
});