 angular.module("RESTServices", [])
  .service('SSFUsersRest', ['$http', function($http) {
   var SSFUsersRest = this;
   SSFUsersRest.post = function(newUserData) {
    return $http({
     url: "https://simplemessenger-tammylam.c9users.io/api/SSFUsers",
     method: "POST",
     data: newUserData
    });
   };
   SSFUsersRest.display = function(userData) {
    return $http({
     url: "https://simplemessenger-tammylam.c9users.io/api/SSFUsers/login",
     method: "POST",
     data: userData
    });
   };


  }]);