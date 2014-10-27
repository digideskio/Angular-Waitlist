'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function () {

  }])
  .controller('WaitlistController',['$scope', '$firebase', 'FIREBASE_URL', function ($scope,$firebase, FIREBASE_URL){
    var partiesRef = new Firebase(FIREBASE_URL + 'parties')

    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {name:'',song:'', phone:'', done:false, notified: "No"};

    $scope.saveParty = function(){
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name:'',song:'', phone:'', done: false, notified: "No"};
    };

    $scope.sendTextMessage = function(party){
      var textMessageRef = new Firebase(FIREBASE_URL + 'textMessages')
      var textMessages = $firebase(textMessageRef);
      var newTextMessage = {
        phoneNumber: party.phone,
        name: party.name,
        song: party.song
      };
      textMessages.$add(newTextMessage);
      party.notified = "Yes"
      $scope.parties.$save(party.$id);
    };
  }])
  .controller('AuthController', ['$scope', '$firebaseSimpleLogin', '$location', 'FIREBASE_URL', 'authService', function ($scope, $firebaseSimpleLogin, $location, FIREBASE_URL, authService) {
    var authRef = new Firebase(FIREBASE_URL)
    var auth = $firebaseSimpleLogin(authRef)

    $scope.user = {email:'',password:''}

    $scope.register = function() {
      auth.$createUser($scope.user.email, $scope.user.password).then(function(data){
        console.log(data);
        // auth.$login('password', $scope.user)
        $scope.login();
      });
    };

    $scope.login = function () {
      authService.login($scope.user)
    };

    $scope.logout = function  () {
      auth.$logout();
      $location.path('/');
    }
  }]);
