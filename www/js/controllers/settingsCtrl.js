/*global angular*/
angular.module('starter.controllers')
  .controller('settingsCtrl', ['$scope', '$state', '$ionicActionSheet', 
  //'AlertPopup',
    function($scope, $state, $ionicActionSheet, AlertPopup) {
      $scope.logout = function() {
        var hideSheet = $ionicActionSheet.show({
          titleText: 'Are you sure?',
          destructiveText: 'Log out',
          cancelText: 'Cancel',
          cancel: function() {},
          destructiveButtonClicked: function() {
            hideSheet();
            return alertCallback();
          }
        });
      };

      function alertCallback() {
        // var alert = new AlertPopup('Bye for now!');
        // return alert.then(function() {
          $state.go('app.login');
        
      }
    }
  ]);

// .controller('LoginController', function ($scope, $state, AlertPopup) {
//   $scope.login = function() {
//     var alert = new AlertPopup('Login successful');
//     alert.then(function(){
//       $state.go('app.tabs.recent');
//     });
//   };
// })