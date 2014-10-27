'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function () {

  }])
  .controller('WaitlistController',['$scope', 'textMessageService', 'partyService', function ($scope, textMessageService, partyService){
    $scope.parties = partyService.parties

    $scope.newParty = {name:'',song:'', phone:'', done:false, notified: "No"};

    $scope.saveParty = function(){
      partyService.saveParty($scope.newParty, $scope.currentUser.id)
      $scope.newParty = {name:'',song:'', phone:'', done: false, notified: "No"};
    };

    $scope.sendTextMessage = function(party){
      textMessageService.sendTextMessage(party);
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
