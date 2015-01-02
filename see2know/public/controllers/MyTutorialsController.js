module.controller('MyTutorialsController', ['$scope', 'Restangular', '$state',
    function ($scope, Restangular, $state) {
        
        var skip = 0;
        var limit = 10;
        
        this.init = function () {
            
            $scope.tutorials = new Array();
           
        }
        
        this.getMyTutorials = function () {
            
            Restangular.one('tutorial').one('my')
                    .one('skip', skip).one('limit', limit).get().then(
                function (response) {
                    
                    if (response.tutorials.length > 0) {
                        skip += 10;
                    }
                    
                    $scope.tutorials = $scope.tutorials.concat(response.tutorials);
                    
                    Restangular.one('user').one('profile').get().then(
                        function (response) {
                            
                            $scope.tutorials.forEach(
                                function (tutorial) {
                                    tutorial.author = response.user;
                                }
                            );
                            
                        }
                    );
    
                }
            );
         
        };
        
        this.editTutorial = function (tutorial) {
            
            window.sessionStorage.setItem('tutorialEditable', JSON.stringify(tutorial));
            $state.go('editor');
        };

    }
]);