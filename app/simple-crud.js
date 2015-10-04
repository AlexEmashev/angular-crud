// Create an angular app module with name 'simpleCrud'
var app = angular.module('simpleCrud',[]);

// Create controller 'crudCtrl' to manage the data on the page
app.controller('crudCtrl', function($scope, $http){  
  // Test of reading data from remote service
  $http.get("http://jsonplaceholder.typicode.com/users")
    .success(function(resoponse) { $scope.users = resoponse; })
    .error(function(response) { console.log("Request error: %s", response); });
    
  // Method create new record
  $scope.create = function(){
    $http.post("http://jsonplaceholder.typicode.com/users", $scope.user)
      .success(function(response) { 
        console.log(response);
        $scope.users.push(response); 
      })
      .error(function(response) {console.log("error " + response)});
  };
  
  // Method for creating a new user
  $scope.new = function(){
    var newUserId =  $scope.users.count;
    $scope.user = {id: newUserId, name: "", email: ""};
  };
});