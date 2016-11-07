var myApp = angular.module("myApp",["ui.router"]);

myApp.controller("MainCtlr",["$scope",function($scope){
    $scope.appname = "hello"
}]);

myApp.config(function($locationProvider,$stateProvider,$urlRouterProvider){
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
    // Next step is to add in 
    $stateProvider
        .state('home',{
            url:"/home",
            templateUrl:"home.html"
        })
        .state('about',{
            url:"/about",
            templateUrl:"home.html"
        });
});