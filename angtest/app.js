var myApp = angular.module("myApp",["ui.router"]);

myApp.controller("MainCtlr",["$scope",function($scope){
    $scope.appname = "hello"
}]);

myApp.config(function($locationProvider,$stateProvider,$urlRouterProvider){
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    // Next step is to add in 
    $stateProvider
        .state('home',{
            url:"/",
            templateUrl:"start.html",
            controller:"MainCtlr"
        })
        .state('class',{
            url:"/class/:class",
            templateUrl:"class.html",
            controller:"classCtlr"
            
        });
});

myApp.controller("classCtlr",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
    var req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/grades/class/"+$stateParams.class,
        
    }).success(function(data){
        console.log(data);
    }).error(function(){
        console.log("Err");
    });
    
}]);

