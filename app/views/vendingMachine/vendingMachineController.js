angular.module('myApp.vendingmachine', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vendingmachine', {
    templateUrl: 'views/vendingMachine/vendingMachineView.html',
    controller: 'vendingMachineController'
  });
}])

.controller('vendingMachineController', ['$scope', 'VendingMachineService', function($scope, VendingMachineService) {
	$scope.screenMessage = 'EXACT CHANGE ONLY';
	$scope.coinReturn = {
		quarters : 0,
		dimes : 0,
		nickels : 0,
		pennies : 0
	};

	$scope.insertCoin = function(coin){

	};

	$scope.clearCoinReturn = function(){

	};

	$scope.returnCoins = function(){

	};
}]);