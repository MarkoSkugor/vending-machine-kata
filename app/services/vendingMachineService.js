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
		needsExactChange : true,
		insertCoin : function(coin){

		},
		dispenseSnack : function(snackName){

		},
		returnCoins : function(){
			var coins = angular.copy(this.coins);
			this.coins = [];
			return coins;
		},
		determineCoinType : function(coin){

		},
		getCoinsTotalValue : function(){

		}
	};

	return VendingMachineService;
}]);