angular.module('myApp.vendingmachine', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vendingmachine', {
    templateUrl: 'views/vendingMachine/vendingMachineView.html',
    controller: 'vendingMachineController'
  });
}])

.controller('vendingMachineController', ['$scope', 'VendingMachineService', function($scope, VendingMachineService) {
	$scope.screenMessage = 'EXACT CHANGE ONLY';
	$scope.snackImage = '';
	var imagePaths = {
		cola : 'images/cola.gif',
		chips : 'images/chips.png',
		candy : 'images/candy.gif'
	};

	$scope.insertCoin = function(coin){
		$scope.snackImage = '';
		if(VendingMachineService.determineCoinType(coin) == 'penny'){
			$scope.coinReturn.pennies++;
		} else {
			VendingMachineService.insertCoin(coin);
			$scope.screenMessage = '$' + VendingMachineService.getInsertedCoinsTotalValue().toFixed(2);
		}
	};

	$scope.clearCoinReturn = function(){
		$scope.coinReturn = {
			quarters : 0,
			dimes : 0,
			nickels : 0,
			pennies : 0
		};
	};

	$scope.clearCoinReturn();

	$scope.returnCoins = function(){
		var returnedCoins = VendingMachineService.returnCoins();
		$scope.coinReturn.quarters += returnedCoins.quarters;
		$scope.coinReturn.dimes += returnedCoins.dimes;
		$scope.coinReturn.nickels += returnedCoins.nickels;
		$scope.screenMessage = VendingMachineService.needsExactChange() ? 'EXACT CHANGE ONLY' : 'INSERT COIN';
	};

	$scope.selectSnack = function(snackName){
		var result = VendingMachineService.dispenseSnack(snackName);

		if(!result.error){
			switch(snackName){
				case 'cola':
					$scope.snackImage = imagePaths.cola;
					break;
				case 'chips':
					$scope.snackImage = imagePaths.chips;
					break;
				case 'candy':
					$scope.snackImage = imagePaths.candy;
					break;
			}
			$scope.coinReturn.quarters += result.change.quarters;
			$scope.coinReturn.dimes += result.change.dimes;
			$scope.coinReturn.nickels += result.change.nickels;
		}

		$scope.screenMessage = result.message;
	};
}]);