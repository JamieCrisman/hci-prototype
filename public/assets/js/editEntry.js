var app = angular.module('entry', ['angularFileUpload']);
app.controller('entryController', function($scope, $http, $upload, $window){
  $scope.entry = {
    active: true
  };
  $scope.myImages = [];
  $scope.clearDispError = function(){
    $scope.dispError = null;
  }

  var init = function(){
    var entry = $window.location.pathname.split("/")[3];
    $http.get("/api/entry/"+entry).success(function(resp){
      console.log(resp);
      $scope.entry = resp.entry;
      console.log($scope.entry);
    }).
    error(function(resp){
      console.log("!!!! ERROR GETTING ENTRY !!!");
    })
  }
  init();

  $scope.deleteIndex = function(){
    console.log("DELETING!");
  }

  $scope.submitEntry = function(){
    var data = $scope.entry;
    var entry = $window.location.pathname.split("/")[3];
    console.log(entry);
    $http.post($window.location.pathname, JSON.stringify(data)).
    success(function(resp){
      console.log("success");
      console.log(resp);
      $scope.dispError = "OK!";
    }).
    error(function(resp){
      console.log("error");
      console.log(resp);
      $scope.dispError = resp.msg;
    });
    
  }
});