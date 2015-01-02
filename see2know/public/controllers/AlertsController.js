module.controller('AlertsController', ['$scope', 'AlertsService', function ($scope, AlertsService) {
        $scope.alerts = AlertsService.alerts;
        
        $scope.clearAlerts = function(){
            AlertsService.clearAlerts();
        };
    }
]);