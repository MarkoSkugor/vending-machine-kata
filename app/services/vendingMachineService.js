services.factory('VendingMachineService', ['$rootScope', function($rootScope){
	var VendingMachineService = {
		storedCoins : {
			quarters : 0,
			dimes : 0,
			nickels : 0
		},
		insertedCoins : {
			quarters : 0,
			dimes : 0,
			nickels : 0
		},
		snacks : [
			{
				name : 'cola',
				price : 1,
				quantity : 3
			},
			{
				name : 'chips',
				price : .5,
				quantity : 3
			},
			{
				name : 'candy',
				price : .65,
				quantity : 3
			}
		],
		insertCoin : function(coin){
			var coinType = this.determineCoinType(coin);
			if(coinType && coinType !== 'penny'){
				switch(coinType){
					case 'quarter':
						this.insertedCoins.quarters++;
						break;
					case 'dime':
						this.insertedCoins.dimes++;
						break;
					case 'nickel':
						this.insertedCoins.nickels++;
						break;
				}
				return true;
			} else {
				return false;
			}
		},
		dispenseSnack : function(snackName){
			var snackToDispense = _.find(this.snacks, function(snack){
				return snack.name == snackName;
			});
			if(snackToDispense && snackToDispense.quantity > 0
				&& this.getInsertedCoinsTotalValue() >= snackToDispense.price){
				var change = this.processPayment(snackToDispense.price);
				snackToDispense.quantity--;
				return change;
			} else {
				return false;
			}
		},
		processPayment : function(price){
			var totalInserted = this.getInsertedCoinsTotalValue();
			var totalChange = Math.round((totalInserted - price) * 100) / 100;
			this.storedCoins.quarters += this.insertedCoins.quarters;
			this.storedCoins.dimes += this.insertedCoins.dimes;
			this.storedCoins.nickels += this.insertedCoins.nickels;
			this.clearInsertedCoins();
			var changeCoins = {
				quarters : 0,
				dimes : 0,
				nickels : 0
			};

			while(totalChange > 0){
				if(totalChange >= .25 && this.storedCoins.quarters > 0){
					this.storedCoins.quarters--;
					changeCoins.quarters++;
					totalChange = Math.round((totalChange - .25) * 100) / 100;
				} else if(totalChange >= .1 && this.storedCoins.dimes > 0){
					this.storedCoins.dimes--;
					changeCoins.dimes++;
					totalChange = Math.round((totalChange - .1) * 100) / 100;
				} else if(totalChange >= .05 && this.storedCoins.nickels > 0){
					this.storedCoins.nickels--;
					changeCoins.nickels++;
					totalChange = Math.round((totalChange - .05) * 100) / 100;
				} else {
					break;
				}
			}

			return changeCoins;
		},
		returnCoins : function(){
			var coins = angular.copy(this.insertedCoins);
			this.clearInsertedCoins();
			return coins;
		},
		clearInsertedCoins : function(){
			this.insertedCoins = {
				quarters : 0,
				dimes : 0,
				nickels : 0
			};
		},
		determineCoinType : function(coin){
			var coinType;
			if(coin.diameter == .955 && coin.weight == 5.670){
				coinType = 'quarter';
			} else if(coin.diameter == .705 && coin.weight == 2.268){
				coinType = 'dime';
			} else if(coin.diameter == .835 && coin.weight == 5.000){
				coinType = 'nickel';
			} else if(coin.diameter == .750 && coin.weight == 2.500){
				coinType = 'penny';
			}
			return coinType;
		},
		getSnackPrice : function(snackName){
			var snack = _.find(this.snacks, function(snack){
				return snack.name == snackName;
			});

			return snack ? snack.price : undefined;
		},
		getCoinValue : function(coinType){
			switch(coinType){
				case 'quarter':
					return .25;
					break;
				case 'dime':
					return .1;
					break;
				case 'nickel':
					return .05;
					break;
				case 'penny':
					return .01;
					break;
				default:
					return 0;
			}
		},
		getInsertedCoinsTotalValue : function(){
			var total = (this.insertedCoins.quarters * .25) 
						+ (this.insertedCoins.dimes * .1) 
						+ (this.insertedCoins.nickels * .05);
			return Math.round(total * 100) / 100;
		},
		needsExactChange : function(){
			return this.storedCoins.dimes == 0 || this.storedCoins.nickels == 0;
		}
	};

	return VendingMachineService;
}]);