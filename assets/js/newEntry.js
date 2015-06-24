var app = angular.module('entry', ['angularFileUpload']);
app.controller('entryController', function($scope, $http, $upload, $window){
  $scope.entry = {
    active: true
  };
  $scope.myImages = [];
  $scope.clearDispError = function(){
    $scope.dispError = null;
  }

  $scope.submitEntry = function(){
    console.log("hi, time to submit!");
    var data = $scope.entry;
    $http.post("/admin/entry/new", JSON.stringify(data)).
    success(function(resp){
      console.log("success");
      console.log(resp);
      $window.location.href = "/admin";
    }).
    error(function(resp){
      console.log("error");
      console.log(resp);
      $scope.dispError = resp.msg;
    });
  }
});