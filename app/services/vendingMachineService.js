services.factory('VendingMachineService', ['$rootScope', function($rootScope){
	var VendingMachineService = {
		coins : [],
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
				coin.value = this.getCoinValue(coinType);
				coin.coinType = coinType;
				this.coins.push(coin);
				return true;
			} else {
				return false;
			}
		},
		dispenseSnack : function(snackName){
			var snackToDispense = _.find(this.snacks, function(snack){
				return snack.name == snackName;
			});
			if(snackToDispense && snackToDispense.quantity > 0){
				snackToDispense.quantity--;
				return true;
			} else {
				return false;
			}
		},
		returnCoins : function(){
			var coins = angular.copy(this.coins);
			this.coins = [];
			return coins;
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
		getCoinsTotalValue : function(){
			var total = _.reduce(_.pluck(this.coins, 'value'), function(memo, coinValue){
				return memo + coinValue;
			}, 0);
			return total == undefined ? 0 : Math.round(total * 100) / 100;
		},
		needsExactChange : function(){
			var dimes = _.find(this.coins, function(coin){
				return coin.coinType == 'dime';
			});

			var nickels = _.find(this.coins, function(coin){
				return coin.coinType == 'nickel';
			});

			return dimes == undefined || nickels == undefined;
		}
	};

	return VendingMachineService;
}]);