module.controller('FavoritesController', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {
        
        var skip = 0;
        var limit = 10;
        
        this.init = function () {
            
            $scope.tutorials = new Array();
           
        }
        
        this.getFavorites = function () {
            
            var getProfile = Restangular.one('user').one('profile').get()
            getProfile.then(
                function (response) {
                    $scope.user = response.user;
                    Restangular.one('tutorial').one('favorites')
                    .one('skip', skip).one('limit', limit).customPOST($scope.user)
                    .then(
                        function (response) {
                            
                            if (response.tutorials.length > 0) {
                                skip += 10;
                            }
                            
                            $scope.tutorials = $scope.tutorials.concat(response.tutorials);
                            
                            $scope.tutorials.forEach(
                                function (tutorial) {
                                    Restangular.one('user').one('profile').one(tutorial.user)
                                    .get().then(
                                        function (response) {
                                            tutorial.author = response.user;
                                        });
                                }
                            );
                        });
                }
            );
         
        };
        
        this.viewTutorial = function (tutorial) {
            
            window.sessionStorage.setItem('tutorial', JSON.stringify(tutorial));
            $state.go('tutorial');
        };

    }
]);