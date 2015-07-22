var app = angular.module('commit', ['angularFileUpload']);
app.controller('commitController', function($scope, $http, $upload, $window){
  $scope.entry = {
    active: true
  };
  $scope.myImages = [];
  $scope.clearDispError = function(){
    $scope.dispError = null;
  }

  $scope.submitEntry = function(){
    var data = $scope.entry;
    var entry = $window.location.pathname.split("/")[3];
    console.log(entry);
    $http.post($window.location.pathname, JSON.stringify(data)).
    success(function(resp){
      console.log("success");
      console.log(resp);
      $window.location.href = "/admin/entry/"+entry+"/edit";
    }).
    error(function(resp){
      console.log("error");
      console.log(resp);
      $scope.dispError = resp.msg;
    });
    
  }
});