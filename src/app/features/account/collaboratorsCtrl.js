define([
  'angular',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('CollaboratorsCtrl', function($scope, $http, backendSrv) {

    $scope.collaborator = {
      loginOrEmail: '',
      role: 'Viewer',
    };

    $scope.init = function() {
      $scope.get();
    };

    $scope.get = function() {
      backendSrv.get('/api/account/collaborators').then(function(collaborators) {
        $scope.collaborators = collaborators;
      });
    };

    $scope.removeCollaborator = function(collaborator) {
      backendSrv.request({
        method: 'DELETE',
        url: '/api/account/collaborators/' + collaborator.id,
        desc: 'Remove collaborator',
      }).then($scope.get);
    };

    $scope.addCollaborator = function() {
      if (!$scope.form.$valid) {
        return;
      }

      backendSrv.request({
        method: 'PUT',
        url: '/api/account/collaborators',
        data: $scope.collaborator,
        desc: 'Add collaborator'
      }).then($scope.get);
    };

    $scope.init();

  });
});
