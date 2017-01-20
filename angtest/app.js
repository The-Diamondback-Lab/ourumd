var myApp = angular.module("myApp",["ui.router","nvd3","autocomplete"]);

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
    var class_req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/grades/class/"+$stateParams.class
    }).success(function(data){
        $scope.class_data = cleanForPie(data);
        $scope.class = $stateParams.class;
        $scope.data = $scope.class_data;
    }).error(function(){
        console.log("Err");
    });
    
    var prof_list_req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/class/"+$stateParams.class+"/proflist"
    }).success(function(data){
        console.log(data)
        for(i = 0; i < data.length; i++) {
            document.getElementById("proflist").innerHTML +=
                data[i]["Professor Name"] == "" ? 
                "" : "<option>" + data[i]["Professor Name"] +"</option>";
        }
        
    }).error(function(){
        console.log("Error - Unable to process class list request")
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
    $scope.changeProf = function () {
        if(document.getElementById('proflist').value != "All Professors") {
            var prof_req = $http({
                method:"GET",
                url:"http://127.0.0.1:3000/grades/class/"+$stateParams.class+"/prof/"+document.getElementById('proflist').value
            }).success(function(data){
                console.log(data);
                $scope.data = cleanForPie(data);
            }).error(function(){
                console.log("Error - Unable to process request for new grade data for professor option")
            })
            console.log(document.getElementById('proflist').value)
        }
    }
    
}]);

myApp.controller("profCtlr",["$scope","$http","$stateParams",function($scope,$http,$stateParams){
    // When the professor controller is called a request is made to the grades/professor end point
    var prof_req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/grades/prof/"+$stateParams.prof
    }).success(function(data){
        $scope.prof_data = cleanForPie(data);
        $scope.prof = $stateParams.prof;
        $scope.data = $scope.prof_data;
    }).error(function(){
        console.log("Error - Unable to process main professor request");
    });
    
    var class_list_req = $http({
        method:"GET",
        url:"http://127.0.0.1:3000/prof/"+$stateParams.prof+"/classlist"
    }).success(function(data){
        // console.log(data)
        for(i = 0; i < data.length; i++) {
            
            document.getElementById("classlist").innerHTML +=
                data[i]["Course"] == "" ? 
                "" : "<option>" + data[i]["Course"] +"</option>";
        }
    }).error(function(){
        console.log("Error - Unable to process class list request")
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
        //console.log(result)
        return result;
    }
    $scope.changeClass = function () {
        if(document.getElementById('classlist').value != "All Classes") {
            var prof_req = $http({
                method:"GET",
                url:"http://127.0.0.1:3000/grades/class/"+document.getElementById('classlist').value+"/prof/"+$stateParams.prof
            }).success(function(data){
                console.log(data);
                $scope.data = cleanForPie(data);
            }).error(function(){
                console.log("Error - Unable to process request for new grade data for professor option")
            })
            console.log(document.getElementById('classlist').value)
        }
    }
    
}]);

myApp.controller("searchCtlr",["$scope","$http","$state",function($scope,$http,$state){
    $scope.classes = [];
    $scope.profs = [];
    
    $scope.searchClass = function(searchTerm) {
        if(searchTerm.length > 3) {
            var searchClassReq = $http({
                method:"GET",
                url:"http://127.0.0.1:3000/search/class/"+searchTerm
            }).success(function(data){
                result_arr = [];
                for(i = 0; i < data.length; i++) {
                    result_arr.push(data[i]["Course"])
                }
                console.log(data)
                console.log(result_arr);
                $scope.classes = result_arr;
                
            }).error(function(){
                console.log("Error - Unable to process request to search class")
            });
        }
    };
    
    $scope.goToClass = function(selectedClass) {
        $state.go("class",{class:selectedClass})
    };
    
    $scope.searchProf = function(searchTerm) {
        if(searchTerm.length > 3) {
            var searchProfReq = $http({
                method:"GET",
                url:"http://127.0.0.1:3000/search/prof/"+searchTerm
            }).success(function(data){
                console.log(data)
                result_arr = [];
                for(i = 0; i < data.length; i++) {
                    result_arr.push(data[i]["Professor Name"])
                }
                
                $scope.profs = result_arr;
            }).error(function(){
                console.log("Error - Unable to process request to search professors")
            });
        }
    }
    
    $scope.goToProf = function(selectedProf) {
        $state.go("professor",{prof:selectedProf})
    }

}]);

