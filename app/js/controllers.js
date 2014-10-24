'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function () {

  }])
  .controller('WaitlistController',['$scope', '$firebase', function ($scope,$firebase){
    var partiesRef = new Firebase('https://kara-oke.firebaseio.com/parties')

    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {name:'',song:'', phone:'', done:false, notified: "No"};

    $scope.saveParty = function(){
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name:'',song:'', phone:'', done: false, notified: "No"};
    };

    $scope.sendTextMessage = function(party){
      var textMessageRef = new Firebase('https://kara-oke.firebaseio.com/textMessages')
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
  .controller('AuthController', ['$scope', '$firebaseSimpleLogin', function ($scope, $firebaseSimpleLogin) {
    var authRef = new Firebase("https://kara-oke.firebaseio.com/")
    var auth = $firebaseSimpleLogin(authRef)

    $scope.user = {email:'',password:''}

    $scope.register = function() {
      auth.$createUser($scope.user.email, $scope.user.password).then(function(data){
        console.log(data);
      });
    };
  }]);
