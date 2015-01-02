module.controller('HomeController', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {
        
        var skip = 0;
        var limit = 10;
        
        this.init = function () {
            $scope.tutorials = new Array();
            $scope.textSearch = '';
            $scope.category = 'uncategorized';
        }
        
        this.getTutorialsPublished = function (clear) {
            
            if (clear) {
                $scope.tutorials = new Array();
                skip = 0;
            }
            
            var search = ($scope.textSearch === '' ? 'no-text': $scope.textSearch);
            
            Restangular.one('tutorial').one('published')
                .one('skip', skip).one('limit', limit).one(search).one($scope.category).get()
                .then(
                function (response) {
                    
                    if (response.tutorials.length > 0) {
                        skip += 10;
                    }
                    
                    $scope.tutorials = $scope.tutorials.concat(response.tutorials);
                    
                    $scope.tutorials.forEach(function (tutorial) {
                        Restangular.one('user').one('profile').one(tutorial.user).get()
                    .then(function (response) {
                            tutorial.author = response.user;
                        });
                    });
                });
        };
        
        this.viewTutorial = function (tutorial) {
            
            window.sessionStorage.setItem('tutorial', JSON.stringify(tutorial));
            $state.go('tutorial');
        };

    }
]);