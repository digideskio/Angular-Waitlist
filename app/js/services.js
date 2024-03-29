'use strict';

/* Services */

angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://kara-oke.firebaseio.com/')
  .factory('dataService', function($firebase, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    // closes navbar on click
    // Doubt that this is a good place for this...
    // Please advise
    $('.nav a').on('click', function(){
      $(".btn-navbar").click(); //bootstrap 2.x
      $(".navbar-toggle").click() //bootstrap 3.x by Richard
    });

    return fireData;
  })

  .factory('partyService',function(dataService) {
    var users = dataService.$child('users');

    var partyServiceObject = {
      saveParty: function(party, userId) {
        users.$child(userId).$child('parties').$add(party);
      },
      getPartiesByUserId: function(userId) {
        return users.$child(userId).$child('parties');
      }
    };

    return partyServiceObject;
  })

  .factory('textMessageService', function(dataService, partyService) {
    var textMessages = dataService.$child('textMessages')

    var textMessageServiceObject = {
      sendTextMessage: function(party, userId) {
        var newTextMessage = {
          phoneNumber: '1' + party.phone,
          name: party.name,
          song: party.song
        };
        textMessages.$add(newTextMessage);
        partyService.getPartiesByUserId(userId).$child(party.$id).$update({notified: 'Yes'})
      }
    };

    return textMessageServiceObject;
  })

  .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL, dataService) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);
    var emails = dataService.$child('emails')

    var authServiceObject = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          authServiceObject.login(user, function() {
            emails.$add({email: user.email});
          });
        });
      },
      login: function(user, optinalCallback) {
        auth.$login('password', user).then(function(data) {
          if (optinalCallback) {
            optinalCallback();
          }
          $location.path('/waitlist');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/');
      },
      getCurrentUser: function() {
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function() {
      $rootScope.currentUser = null;
    });

    return authServiceObject;
  });
