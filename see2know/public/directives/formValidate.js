module.directive('formValidate', [function () {
        return {
            require: 'ngModel',
            scope: {
                submit: '=',
                rules: '=',
                messages: '='
            },
            link: function (scope, element, attrs, ngModel) {

                element.validate({
                    rules: scope.rules,
                    messages: scope.messages,
                    submitHandler: function (form) {
                        scope.submit(ngModel.$modelValue);
                        scope.$apply();
                    },
                    errorPlacement: function (error, element) {
                        error.insertAfter(element.parent());
                    }
                });
                
            }
        };
    }
]);