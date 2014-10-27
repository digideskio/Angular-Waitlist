'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function () {

  }])
  .controller('WaitlistController',['$scope', 'partyService', function ($scope, partyService){
    $scope.parties = partyService.parties

    $scope.newParty = {name:'',song:'', phone:'', done:false, notified: "No"};

    $scope.saveParty = function(){
      partyService.saveParty($scope.newParty)
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
  .controller('AuthController', ['$scope', 'authService', function($scope, authService) {

    $scope.user = {email:'',password:''};

    $scope.register = function() {
      authService.register($scope.user);
    };

    $scope.login = function() {
      authService.login($scope.user);
    };

    $scope.logout = function() {
      authService.logout();
    };

  }]);
