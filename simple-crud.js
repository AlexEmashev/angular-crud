// Create an angular app module with name 'simpleCrud'
var app = angular.module('simpleCrud',[]);

// Create controller 'crudCtrl' to manage the data on the page
app.controller('crudCtrl', function($scope){
  // Test data binding
  $scope.persons = [
    {id: 0, name: 'Jack', age: 12},
    {id: 1, name: 'John', age: 12},
    {id: 2, name: 'Jane', age: 12}
  ];
})