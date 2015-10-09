// Controller, that performs CRUD operations
app.controller('crudCtrl', function ($scope, $http, $modal) {
  
  // UI Select control
  $scope.selectedCity = {};
  $scope.cities = [];
  
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
      
      console.log(cities);
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
  
  // Read list of users from remote service
  $http.get("http://jsonplaceholder.typicode.com/users")
    .success(function (resoponse) {
      $scope.users = resoponse;
    })
    .error(function (response) {
      console.log("Request error: %s", response);
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
      .success(function (response) {
        // The service don't actually return new record, it just echoing what has been sent.
        // So record need a new ID.
        response.id = $scope.getNewUserId();
        $scope.users.push(response);
      })
      .error(function (response) {
        console.log("error " + response);
      });
  };
  
  // Return specific record to display or edit
  $scope.show = function () {
    if ($scope.selectedId) {
      $scope.userDataAcquired = false;
      $http.get("http://jsonplaceholder.typicode.com/users/" + $scope.selectedId)
        .success(function (response) {
          // Hack: Update actually doesn't update data on the server. 
          // If user tries to edit row that he edit perviously he get an original values
          // That's why response doesn't used here.
          $scope.users.forEach(function (element, index, array){
            if (element.id == $scope.selectedId){
                $scope.user = element;
                $scope.userDataAcquired = true;
              }
          });
        })
        .error(function (response) {
          console.log("error " + response);
        });
    }
  }

  // Method for editing a user
  $scope.update = function () {
    $http.put("http://jsonplaceholder.typicode.com/users/" + $scope.user.id)
    .success(function (response) {
      // Our fake RESTful service doesn't return updated string, but original
      // So we just simulate successful update. 
      $scope.users.forEach(function (element, index, array){
        if (element.id == $scope.user.id){
          array[index] = $scope.user;
        }
      });
    })
    .error(function (response) {
      console.log("error " + response);
    });

  };
  
  // Method for destroying a user record
  $scope.destroy = function () {
    if ($scope.selectedId){
        $http.delete("http://jsonplaceholder.typicode.com/users/" + $scope.selectedId)
        .success(function (response) {
          // Remove deleted item from array
          for (var i = 0; i < $scope.users.length; i++){    
            if ($scope.users[i].id == $scope.selectedId){
              $scope.users.splice(i, 1);
              break;
            }
          }
          $scope.selectedId = undefined;
        })
        .error(function (response) {
          console.log("error " + response);
        });
      }
  }
});