angular.module('myApp.vendingmachine', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vendingmachine', {
    templateUrl: 'views/vendingMachine/vendingMachineView.html',
    controller: 'vendingMachineController'
  });
}])

.controller('vendingMachineController', [function() {
	//TODO: make the controller do stuff
}]);