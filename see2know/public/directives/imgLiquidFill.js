module.directive('imgLiquidFill', ['$timeout',
    function ($timeout) {
        return{
            link: function ($scope, element, attrs) {

                var config = $scope.$eval(attrs.imgLiquidFill);

                if (config) {
                    element.imgLiquid(config);
                }
                else {
                    element.imgLiquid();
                }

                lazyLoad(element, $scope.$eval(attrs.lazyLoadParamaters));

                $scope.lazyLoad = function () {
                    lazyLoad(element, $scope.$eval(attrs.lazyLoadParamaters));
                };

            }
        };

        function lazyLoad(element, parameters) {
            $timeout(function () {
                element.lazyload(parameters);
            }, 1000);
        }
    }
]);