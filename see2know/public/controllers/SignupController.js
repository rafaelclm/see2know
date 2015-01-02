module.controller('SignupController', ['$scope', 'Restangular', '$translate', 'AlertsService',
    function ($scope, Restangular, $translate, AlertsService) {
        
        var HOME = '/';

        this.init = function () {
            $scope.user = {};
        };

        this.signup = function (user){

            var post = Restangular.one('signup').customPOST(user);
            
            post.then(function (response) {
                window.location.href = HOME;
            }, function (response) {
                if (response.data.code === 11000) {
                    $translate('USER_ALREADY_EXIST').then(function (message) {
                        AlertsService.addAlert(message, 'alert-danger');
                    });
                }
            });
        }
    }
]);