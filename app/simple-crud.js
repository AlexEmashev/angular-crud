// Create an angular app module with name 'simpleCrud'
var app = angular.module('simpleCrud',[]);

// Create controller 'crudCtrl' to manage the data on the page
app.controller('crudCtrl', function($scope, $http){
  // Test of reading data from remote service
  $http.get("http://jsonplaceholder.typicode.com/users")
    .success(function(resoponse) { $scope.users = resoponse; })
    .error(function(response) { console.log("Request error: %s", response); });
});