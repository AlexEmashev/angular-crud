// Create an angular app module with name 'simpleCrud'
// Using bootstrap component to organize the UI
// ngAnimate - used by bootsrap for modal fade-in\fade-out effects
var app = angular.module('simpleCrud', ['ui.bootstrap', 'ngAnimate']);

// Create controller 'crudCtrl' to manage the data on the page
app.controller('crudCtrl', function ($scope, $http, $modal) {
  // Test of reading data from remote service
  $http.get("http://jsonplaceholder.typicode.com/users")
    .success(function (resoponse) {
      $scope.users = resoponse;
    })
    .error(function (response) {
      console.log("Request error: %s", response);
    });


  // Set selected row in table
  $scope.selectRow = function (id) {
    $scope.selectedId = id;
  };

  // Method create new record
  $scope.create = function () {
    $http.post("http://jsonplaceholder.typicode.com/users", $scope.user)
      .success(function (response) {
        console.log(response);
        $scope.users.push(response);
      })
      .error(function (response) {
        console.log("error " + response);
      });
  };

  // Method for creating a new user
  $scope.new = function () {
    console.log("ShowModal");
    // ToDo: Perform 'new' request.
    var newUserId = $scope.users.count;
    $scope.user = {
      id: newUserId,
      name: "",
      email: ""
    };
  };

  // Method for editing a user
  $scope.edit = function (id) {
    //    var newUserId =  $scope.users.count;
    //    $scope.user = {id: newUserId, name: "", email: ""};
  };

});


// Modal window controller. 
// Setups and shows modal window.
app.controller('modalCtrl', function ($scope, $modal) {

  $scope.showModal = function () {
    $scope.new();

    // Using $modal service to instantiate a modal window
    // It has single method "open()" to create and setup a modal
    var modalInstance = $modal.open({
      animation: true,
      // Can be true, false and 'static' latter don't let close the window by clicking outside
      backdrop: 'static',
      // Pass current scope to modal window, to access to CRUD operations 
      // definded in scope
      scope: $scope,
      // Modal content
      templateUrl: 'modal.html',
      // Controller to controll window behavior
      controller: 'modalInstanceCtrl',
      resolve: {}
    });

    // Actions after modal dismissed
    modalInstance.result.then(function (selectedItem) {
      console.log("Modal dismissed at: " + new Date());
    });
  }
});


// Controller of modal instance.
// Links data and manages dialog actions like close window.
// $modalInstance - scope of current window with additional methods.
app.controller('modalInstanceCtrl', function ($scope, $modalInstance) {
  // Close modal window
  $scope.modalClose = function () {
    $modalInstance.close();
  };

  $scope.modalSubmit = function () {
    $scope.create();
    $modalInstance.close();
  }
});