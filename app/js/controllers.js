'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController',[function () {

  }])
  .controller('WaitlistController',['$scope', '$firebase', function($scope,$firebase){
    var partiesRef = new Firebase('https://kara-oke.firebaseio.com/')

    $scope.parties = $firebase(partiesRef);

    $scope.newParty = {name:'',song:'', phone:''};

    $scope.saveParty = function(){
      $scope.parties.$add($scope.newParty);
      $scope.newParty = {name:'',song:'', phone:''};
    };
  }]);
