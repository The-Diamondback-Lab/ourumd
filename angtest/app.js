var myApp = angular.module("myApp",["ui.router","nvd3"]);

myApp.controller("MainCtlr",["$scope",function($scope){
    $scope.appname = "hello"
}]);

myApp.config(function($locationProvider,$stateProvider,$urlRouterProvider){
    // Commented out code to remove the hashtag. Note - need to look further into this aspect.
    //$locationProvider.html5Mode(true);
    // Defaults all possible routes to the given url of "/"
    $urlRouterProvider.otherwise('/');
    // State provider with defined states/views
    // Controller is immediately loaded and called when the state is entered
    $stateProvider
        // The home state should be the frontpage of the whole project
        .state('home',{
            url:"/",
            templateUrl:"search.html",
            controller:"searchCtlr"
        })
        // Template page for a single class page
        .state('class',{
            url:"/class/:class",
            templateUrl:"class.html",
            controller:"classCtlr"
        })
        // Template for a professor page
        .state('professor',{
            url:"/prof/:prof",
            templateUrl:"prof.html",
            controller:"profCtlr"
        });
});

// The class template page controller
myApp.controller("classCtlr",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
    // When the class controller is called a request is made to the grades/class end point
    var req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/grades/class/"+$stateParams.class,
        
    }).success(function(data){
        $scope.class_data = cleanForPie(data);
        $scope.class = $stateParams.class;
        $scope.data = $scope.class_data;
    }).error(function(){
        console.log("Err");
    });
    // Pie chart example pulled from: http://plnkr.co/edit/vtKWU0?p=preview
    $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
    function cleanForPie(data) {
        result = [];
        keys = Object.keys(data);
        for(i =0; i < keys.length; i++) {
            current = {};
            current.key = keys[i];
            current.y = data[keys[i]];
            result.push(current);
        }
        console.log(result)
        return result;
    }
    
}]);

myApp.controller("profCtlr",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
    // When the professor controller is called a request is made to the grades/professor end point
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

myApp.controller("searchCtlr",["$scope","$http",function($scope,$http){
    

}]);

