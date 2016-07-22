angular.module('starter.controllers')
    .controller('loginCtrl', ['$scope', '$state', '$window', 'SSFUsersRest',
    // 'IonicPushService', '$translate','SSFUsersRest'
    function($scope, $state, $window, SSFUsersRest) {

        $scope.user = {};
        $scope.accessForm = function(form) {
                if (form.$invalid) {
                    return alert("Please fill in your email and password.");
                }

                SSFUsersRest.display($scope.user).then(function(response) {
                    // handle different responses and decide what happens next
                    if (response.status == 200) {
                        // $window.localStorage.token=response.data.id;
                        // $window.localStorage.userId=response.data.userId;
                        
                        $state.go('app.tabs.recent');
                    
                }}, function(err) {
                    if (err.status == 401) {
                        alert("Please check that your email and password are correct.");
                    }else if (err.status == 403) {
                        alert("403 error");    
                    }else if (err.status == 404) {
                        alert("Server not found");
                    }else if (err.status == 500) {
                        alert("The world has ended, or the server just isn’t online");
                    }
                    return err;
                });
        };

    }]);