module.directive('smartSelect2', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attributes, ngModel) {
            
            element.removeAttr('smart-select2 data-smart-select2');
            
            element.select2({
                placeholder: attributes.placeholder,
                allowClear: true,
                maximumSelectionSize: 1
            });
            
            scope.$watch(function () {
                return ngModel.$modelValue;
            }, function (newValue) {
                element.select2('val', newValue);
            });

        }
    };
});
