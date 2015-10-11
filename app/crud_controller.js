// Controller, that performs CRUD operations
app.controller('crudCtrl', function ($scope, $http, $modal) {
  
  ///////////////////////////////// Auxiliary code ////////////////////////////
  // UI Select control
  $scope.selectedCity = {};
  $scope.cities = [];
  // Error obj setup
  $scope.error = {status: "", message: ""};
  
  // Acquire city names
  $scope.getCityNames = function(cityName){
    if(!cityName){
      return;
    }
      
    var params = {address: cityName, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function (response) {
      var cities = [];
      response.data.results.forEach(function (element, index, array) {
        if(element.address_components[0]){
          var cityInfo = element.address_components[0];
          
          if(cityInfo.types && (cityInfo.types[0] == "locality")){
            // Filter out duplicates
            if(cities.indexOf(cityInfo.long_name) == -1){
              cities.push(cityInfo.long_name);
            }
          }
        }
      });
      
      $scope.cities = cities;
    });
  }
  
  // Set selected row in table
  $scope.selectRow = function (id) {
    $scope.selectedId = id;
  };
  
  // Return new ID for an element.
  // Fake RESTful service, used in this app, doesn't asign an ID for an element.
  $scope.getNewUserId = function () {
    var newId = 0;
    $scope.users.forEach(function (element, index, array){
        if (element.id > newId){
          newId = element.id;
        }
    });
    
    return ++newId;
  }
  
  ///////////////////////////////// CRUD methods ////////////////////////////
  
  // Read list of users from remote service
  $http.get("http://jsonplaceholder.typicode.com/users")
  .then(function successCallback (response) {
    $scope.users = response.data;
  }, function errorCallback (response) {
    $scope.error.status = response.status;
    $scope.error.message = response.statusText;
  });

  
  // Method for creating a new user
  $scope.new = function () {
    // userDataAcquired used to determine that data on modal is ready to be shown and form can be edited
    $scope.userDataAcquired = false;
    // Remark: used fake RESTful service doesn't implement '/new' action
    var newUserId = $scope.users.count;
    $scope.user = {
      id: undefined,
      name: "",
      email: "",
      address: {city: ""}
    };
    $scope.userDataAcquired = true;
  };

  // Method create new record
  $scope.create = function () {
    $http.post("http://jsonplaceholder.typicode.com/users", $scope.user)
    .then(function successCallback(response) {
      // The service don't actually return new record, it just echoing what has been sent.
      // So record need a new ID.
      var user = response.data;
      user.id = $scope.getNewUserId();
      $scope.users.push(user);
    }, function errorCallback (response) {
      console.log("Error while creating", response);
      $scope.error.status = response.status;
      $scope.error.message = response.statusText;
  });
  };
  
  // Return specific record to display or edit
  $scope.show = function () {
    if ($scope.selectedId) {
      $scope.userDataAcquired = false;
      
      // Hack: the fake RESTful service doesn't support updating data.
      // So if app want to show record with ID that doesn't exist on server it returns 404.
      // The app has all data it needs to allow user to edit it. So here is just a fake request.
      $http.get("http://jsonplaceholder.typicode.com/users/" + 1)
      .then(function successCallback(response) {
        // Find selected row
        $scope.users.forEach(function (element, index, array){
          if (element.id == $scope.selectedId){
              $scope.user = element;
              $scope.userDataAcquired = true;
            }
        });

      }, function errorCallback (response) {
        console.log("Error in show", response);
        $scope.error.status = response.status;
        $scope.error.message = response.statusText;
      });
    }
  }

  // Method for editing a user
  $scope.update = function () {
    // Hack: fake RESTful service doesn't support update, here is just a fake request.
    $http.put("http://jsonplaceholder.typicode.com/users/" + 1)
    .then(function successCallback(response) {
      // Update row manualy.
      $scope.users.forEach(function (element, index, array){
        if (element.id == $scope.user.id){
          array[index] = $scope.user;
        }
      });
    }, function errorCallback (response) {
      console.log("Error in update", response);
      $scope.error.status = response.status;
      $scope.error.message = response.statusText;
    });
  };
  
  // Method for destroying a user record
  $scope.destroy = function () {
    if ($scope.selectedId){
        $http.delete("http://jsonplaceholder.typicode.com/users/" + $scope.selectedId)
        .then(function successCallback(response) {
            // Remove deleted item from array
            for (var i = 0; i < $scope.users.length; i++){    
              if ($scope.users[i].id == $scope.selectedId){
                $scope.users.splice(i, 1);
                break;
              }
            }
            $scope.selectedId = undefined;
          }, function errorCallback (response) {
            console.log("Error in destroy", response);
            $scope.error.status = response.status;
            $scope.error.message = response.statusText;
          });
      }
  }
  
  // Dismiss shown error
  $scope.dismissError = function() {
    $scope.error = {status: "", message: ""};
  }
});