angular.module('messenger', [
  'ionic',
  'starter.controllers',
  'RESTServices',

])

.run(function ($rootScope, $state){
  ionic.Platform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error(error);
    if (error === 'AUTH_REQUIRED') {
      $state.go('app.login');
    }
  });
  $rootScope.$on('unauth', function (event) {
    $state.go('app.login');
  });
})


.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  
    .state('landing', {
      url: '/',
      templateUrl: 'templates/landing.html',
      // controller: 'landingCtrl'
    })
    
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      views: {
        '': {
          template: '<ion-nav-view name="app"></ion-nav-view>'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'app': {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
          
        }
      }
    })
    .state('app.tabs', {
      url: '/tab',
      abstract: true,
      resolve: {
        'requireAuth': function(){
          return true;
        }
      },
      views: {
        'app': {
      templateUrl: 'templates/app-tabs.html',
      // controller: 'settingsCtrl'
          
        }
      }
    })
    .state('app.tabs.recent', {
      url: '/recent',
      views: {
        'recent-tab': {
          templateUrl: 'templates/recent.html'
        }
      }
    })
    .state('app.tabs.chats', {
      url: '/chats',              
      // 'chats/{username}'??
      // params: { username: { value: null } },
      views: {
        'chats-tab': {
          templateUrl: 'templates/chats.html',
          controller: 'chatCtrl'
        }
      }
    })
    
    .state('app.tabs.map', {
      url: '/map',
      views: {
        'map-tab': {
          templateUrl: 'templates/map.html'
        }
      }
    })
    .state('app.tabs.people', {
      url: '/people',
      views: {
        'people-tab': {
          templateUrl: 'templates/people.html'
        }
      }
    })
    .state('app.tabs.settings', {
      url: '/settings',
      views: {
        'settings-tab': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'

          }
        }
    });
  $urlRouterProvider.otherwise('/');
})
