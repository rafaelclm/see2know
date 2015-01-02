module.directive('htmlPreview', ['$compile', function ($compile) {
        
        var EMPTY_STRING = '';
        var TAG_IDENTIFIER = '#';
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                
                scope.$watch(function () {
                    return ngModel.$viewValue;
                }, function (value) {
                    
                    if (!value) {
                        return;
                    }

                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        }

    }
]);