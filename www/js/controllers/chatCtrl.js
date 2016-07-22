/*global angular*/
angular.module('starter.controllers')
  .controller('chatCtrl', ['$scope', '$stateParams', '$timeout', 'SSFUsersRest', 'Socket', 'Chat',
  function($scope, $stateParams, $timeout, SSFUsersRest, Socket, Chat) {

    $scope.data = {};
    $scope.data.message = "";
    $scope.messages = Chat.getMessages();
    var typing = false;
    var lastTypingTime;
    var TYPING_TIMER_LENGTH = 250;

    Socket.on('connect', function() {

      Chat.scrollBottom();

      if ($stateParams.username) {
        $scope.data.message = "@" + $stateParams.username;
        document.getElementById("msg-input").focus();
      }

      var sendUpdateTyping = function() {
        if (!typing) {
          typing = true;
          Socket.emit('typing');
        }
        lastTypingTime = (new Date()).getTime();
        $timeout(function() {
          var typingTimer = (new Date()).getTime();
          var timeDiff = typingTimer - lastTypingTime;
          if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
            Socket.emit('stop typing');
            typing = false;
          }
        }, TYPING_TIMER_LENGTH);
      };

      $scope.updateTyping = function() {
        sendUpdateTyping();
      };

      $scope.messageIsMine = function(username) {
        return $scope.data.username === username;
      };

      $scope.getBubbleClass = function(username) {
        var classname = 'from-them';
        if ($scope.messageIsMine(username)) {
          classname = 'from-me';
        }
        return classname;
      };

      $scope.sendMessage = function(msg) {
        Chat.sendMessage(msg);
        $scope.data.message = "";
      };

    });
  }]);

// jQuery(function($) {
//     var socket = io.connect();
//     var $messageForm = $('$send-message');
//     var $messageBox = $('message');
//     var $chat = $('chat');

//     $messageForm.submit(function(e) {
//         e.preventDefault();
//         socket.emit('send message', $messageBox.val());
//         $messageBox.val('');
//     });

//     socket.on('new message', function(data) {
//         $chat.append(data + "<br/>");
//     });
//     });

// })