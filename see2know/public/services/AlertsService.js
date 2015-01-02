module.service('AlertsService', ['$timeout',
    function ($timeout) {
        
        var alerts = {};

        function clearAlerts() {
            for (var x in alerts) {
                delete alerts[x];
            }
        }

        return {
            alerts: alerts,
            addAlert: function (message, type) {
                alerts[type] = alerts[type] || [];
                alerts[type].push(message);
                
                if (type === 'alert-success') {
                    $timeout(function () {
                        clearAlerts();
                    }, 5000);
                }
               
            },
            clearAlerts: clearAlerts
        };
    }
]);