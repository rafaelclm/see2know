module.controller('ViewTutorialController', [
    '$scope', 'AlertsService', 'Restangular', '$translate', '$timeout', '$sce',
    function ($scope, AlertsService, Restangular, $translate, $timeout, $sce) {
        
        this.init = function () {
            
            $scope.tutorial = JSON.parse(window.sessionStorage.tutorial);
            $scope.currentPage = 1;
            $scope.totalItems = $scope.tutorial.pages.length * 8;

            var getProfile = Restangular.one('user').one('profile').get()
            getProfile.then(
                function (response) {
                    $scope.user = response.user;
                    $scope.favorite = (($scope.user.favorites.indexOf($scope.tutorial._id) === -1) ? false : true);
                }
            );
        };
        
        this.addToFavorites = function (tutorial, favorite) {
            
            if ($scope.user.favorites.indexOf(tutorial) !== -1) {
                $scope.user.favorites.pop(tutorial);
                favorite = false;
            }
            else {
                $scope.user.favorites.push(tutorial);
                favorite = true;
            }
            
            var post = Restangular.one('user').customPOST($scope.user);
            
            post.then(function (response) {
                $scope.user = response.user;
                sessionStorage.setItem('user', JSON.stringify($scope.user));
                
                if (favorite) {
                    $translate('YES_FAVORITE').then(function (message) {
                        AlertsService.addAlert(message, 'alert-success');
                    });
                }
                else {
                    $translate('NO_FAVORITE').then(function (message) {
                        AlertsService.addAlert(message, 'alert-success');
                    });
                }

            }, function (response) {
                favorite = false;
                if (response.data.code === 11000) {
                    $translate('USER_ALREADY_EXIST').then(function (message) {
                        AlertsService.addAlert(message, 'alert-danger');
                    });
                }
            });
                 
        };

    }
]);