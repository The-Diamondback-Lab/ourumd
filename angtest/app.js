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
            templateUrl:"search.html",
            controller:"searchCtlr"
        })
        .state('class',{
            url:"/class/:class",
            templateUrl:"class.html",
            controller:"classCtlr"
            
        })
        .state('professor',{
            url:"/prof/:prof",
            templateUrl:"prof.html",
            controller:"profCtlr"
        });
});

myApp.controller("classCtlr",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
    var req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/grades/class/"+$stateParams.class,
        
    }).success(function(data){
        $scope.class_data = data;
        $scope.class = $stateParams.class;
        renderBarGraph(data);
    }).error(function(){
        console.log("Err");
    });
    
}]);

myApp.controller("profCtlr",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
    var req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/grades/prof/"+$stateParams.prof,
        
    }).success(function(data){
        $scope.prof_data = data;
        $scope.prof = $stateParams.prof;
    }).error(function(){
        console.log("Err");
    });
    
}]);

myApp.directive('search', function () {
    return function ($scope, element) {
        console.log(document.getElementById("searchBar"))
        element.bind("keyup", function (event) {
          var val = element.val();
          if(val.length > 2) {
            $scope.search(val);
          }
        });
    };
});

myApp.controller("searchCtlr",["$scope","$http",function($scope,$http){
    
    $scope.search = function(val) {
        console.log(val);
//        var req = $http({
//        method:"GET",
//        url:"http://127.0.0.1:3000/grades/class/"+val,
//        
//        }).success(function(data){
//            console.log(data);
//        }).error(function(){
//            console.log("Err");
//        });
    }
}]);

