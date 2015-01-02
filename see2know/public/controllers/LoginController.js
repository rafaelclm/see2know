module.controller('LoginController', ['$scope', 'Restangular', 'AlertsService', '$translate',
    function ($scope, Restangular, AlertsService, $translate) {
        
        var HOME = '/';
        
        this.init = function () {
            $scope.user = {};
        };
        
        this.login = function (user) {
            
            var post = Restangular.one('login').customPOST(user);
            
            post.then(function (response) {
                window.location.href = HOME;
            }, function (response) {
                $translate(response.data.error).then(function (message) {
                    AlertsService.addAlert(message, 'alert-danger');
                });
            });
        }
    }
]);