var app = angular.module('commit', ['angularFileUpload']);
app.controller('commitController', function($scope, $http, $upload, $window){
  $scope.commit = {
    active: true
  };
  $scope.myImages = [];
  $scope.clearDispError = function(){
    $scope.dispError = null;
  }

  var init = function(){
    var entry = $window.location.pathname.split("/")[3];
    var commit = $window.location.pathname.split("/")[4];
    $http.get("/api/entry/"+entry + "/"+commit).success(function(resp){
      $scope.commit = resp.commit;
    }).
    error(function(resp){
      console.log("!!!! ERROR GETTING COMMIT !!!");
    })
  }
  init();

  $scope.deleteCommit = function(){
    $http.delete($window.location.pathname).success(function(resp){
      console.log("deleted this entry");
      $window.location.href = "/admin";
    })
  }

  $scope.submitCommit = function(){
    var data = $scope.commit;
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