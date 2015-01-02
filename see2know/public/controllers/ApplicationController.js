module.controller('ApplicationController', ['$scope', 'Restangular', '$sce', '$timeout', 
    function ($scope, Restangular, $sce, $timeout) {
        
        this.init = function () {
            var getProfile = Restangular.one('user').one('profile').get()
            getProfile.then(
                function (response) {
                    $scope.user = response.user;
                }
            );
            
            $scope.optionsSummernote = {
                height: 300,
                focus: true
            };
            
            $scope.codemirrorOptions = {
                lineWrapping : true,
                lineNumbers: true
            };
        };
        
        function pushLeft(showMenu) {
            
            if (showMenu) {
                $('body').css('margin-right', '250px');
                $('.moveToMenu').css('right', '250px');
            }
            
            if (!showMenu) {
                $('body').css({ 'margin-right': '3px' });
                $('.moveToMenu').css('right', '3px');
            }

        }
        
        function pushRight(showMenu) {
            
            if (showMenu) {
                $('body').css('margin-left', '250px');
                $('.moveToMenu').css('left', '250px');
            }
            
            if (!showMenu) {
                $('body').css({ 'margin-left': '3px' });
                $('.moveToMenu').css('left', '3px');
            }
        }
        
        $scope.$watch('ctrlApplication.showMenu', function (showMenu) {
            pushRight(showMenu);
        });

        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        };
        
        $scope.trustSrcWithImageLiquid = function (src) {
            $timeout(function () {
                $('.imgLiquidFill').imgLiquid();
            }, 2000);
            return $sce.trustAsResourceUrl(src);
        };

        $scope.trustHtml = function (html) {
            return $sce.trustAsHtml(html);
        };

        $scope.generateUUID = function() {
            
            var d = new Date().getTime();
            
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            
            return uuid;
        }
    }
]);