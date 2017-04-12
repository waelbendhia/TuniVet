"use strict";

angular.module('tunivetApp').
controller('tunivetController', function ($scope, $location, $rootScope, patientsService, AuthService, Session, AUTH_EVENTS) {
    $scope.isLoggedIn = Session.getUser() !== null;
    $scope.showPatient = false;
    $scope.patient = {
        id: 0,
        name: "",
        condition: ""
    };

    $scope.closePatient = () => {
        $scope.showPatient = false;
    };

    $scope.getPatient = () => {
        patientsService.getOne($scope.patient.id)
            .then(suc => {
                $scope.patient = suc;
                $scope.showPatient = true;
                $scope.$apply();
            })
            .catch(err => alert(err.data));

    };

    AuthService.getUserStatus();

    $scope.$on(AUTH_EVENTS.loginSuccess, function () {
        $scope.isLoggedIn = Session.getUser() !== null;
    });

    $scope.$on(AUTH_EVENTS.logoutSuccess, function () {
        $scope.isLoggedIn = Session.getUser() !== null;
    });

    $scope.logout = () => {
        AuthService.logout()
            .then(() => {
                $location.path('/');
            })
            .catch(err => {});
    };
});