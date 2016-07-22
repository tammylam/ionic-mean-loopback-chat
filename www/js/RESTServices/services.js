 /*global angular*/
 angular.module("SocketService", [])
   .service('Socket', function(socketFactory, io, mySocket) {
     var myIoSocket = io.connect('http://chat.socket.io:8081');
     mySocket = socketFactory({
       ioSocket: myIoSocket
     });
     return mySocket;
   })

 .factory('Chat', function($ionicScrollDelegate, Socket, SSFUsersRestUsers) {

   var username;
   var users = {};
   users.numUsers = 0;

   var messages = [];
   var TYPING_MSG = '. . .';

   var Notification = function(username, message) {
     var notification = {};
     notification.username = username;
     notification.message = message;
     notification.notification = true;
     return notification;
   };

   Socket.on('new message', function(msg) {
     addMessage(msg);
   });

   Socket.on('typing', function(data) {
     var typingMsg = {
       username: data.username,
       message: TYPING_MSG
     };
     addMessage(typingMsg);
   });

   Socket.on('stop typing', function(data) {
     removeTypingMessage(data.username);
   });

   var scrollBottom = function() {
     $ionicScrollDelegate.resize();
     $ionicScrollDelegate.scrollBottom(true);
   };

   var addMessage = function(msg) {
     msg.notification = msg.notification || false;
     messages.push(msg);
     scrollBottom();
   };

   var removeTypingMessage = function(usr) {
     for (var i = messages.length - 1; i >= 0; i--) {
       if (messages[i].username === usr && messages[i].message.indexOf(TYPING_MSG) > -1) {
         messages.splice(i, 1);
         scrollBottom();
         break;
       }
     }
   };

   return {
     // getUsername: function() {
     //   return username;
     // },
     setUsername: function(usr) {
       username = usr;
     },
     // getMessages: function() {
     //   return messages;
     // },
     sendMessage: function(msg) {
       messages.push({
         username: username,
         message: msg
       });
       scrollBottom();
       Socket.emit('new message', msg);
     },
     scrollBottom: function() {
       scrollBottom();
     }
   };
 })

 .factory('Chats', function() {
   // Might use a resource here that returns JSON array??

   // testing??
   var chats = [{
     id: 0,
     name: 'Tammy L',
     lastText: 'Where are you?',
     face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
   }, {
     id: 1,
     name: 'AB',
     lastText: 'Hey, it\'s me',
     face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
   }, {
     id: 2,
     name: 'CD',
     lastText: 'I\'m hungry',
     face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
   }];

   return {
     all: function() {
       return chats;
     },
     remove: function(chat) {
       chats.splice(chats.indexOf(chat), 1);
     },
     get: function(chatId) {
       for (var i = 0; i < chats.length; i++) {
         if (chats[i].id === parseInt(chatId)) {
           return chats[i];
         }
       }
       return null;
     }
   };
 });