// Modal window controller. 
// Setups and shows modal window.
app.controller('modalCtrl', function ($scope, $modal) {
  $scope.showModal = function (createMode) {
    if(createMode){
      $scope.modalCreateMode = true;
      $scope.new();
    } else {
      $scope.modalCreateMode = false;
      $scope.show();
    }
    
    // Using $modal service to instantiate a modal window
    // It has single method "open()" to create and setup a modal
    var modalInstance = $modal.open({
      animation: true,
      // Can be true, false and 'static' latter don't let close the window by clicking outside
      backdrop: 'static',
      // Pass current scope to modal window, to access to CRUD operations 
      // definded in scope
      scope: $scope,
      keyboard: false,
      // Modal content
      templateUrl: 'app/modal.html',
      // Controller to controll window behavior
      controller: 'modalInstanceCtrl',
      resolve: {}
    });

    // Actions after modal dismissed
    modalInstance.result.then(function (selectedItem) {
      //console.log("Modal dismissed at: " + new Date());
    });
  }
});


// Controller of modal instance.
// Links data and manages dialog actions like close window.
// $modalInstance - scope of current window with additional methods.
app.controller('modalInstanceCtrl', function ($scope, $modalInstance, validationService) {
  // Close modal window
  $scope.modalClose = function () {
    $modalInstance.close();
    $scope.user = {};
  };

  // Submit record
  $scope.modalSubmit = function () {
      if(new validationService().checkFormValidity($scope)){
        if($scope.modalCreateMode){
          $scope.create();
        } else {
          $scope.update();
        }

          $scope.user = {};
          $modalInstance.close();
      }
  }
});