module.directive('jarvisWidget', ['$rootScope', function ($rootScope) {
        return {
            restrict: "A",
            compile: function (element, attributes) {
                if (element.data('widget-color'))
                    element.addClass('jarviswidget-color-' + element.data('widget-color'));


                element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');

                element.addClass('jarviswidget jarviswidget-sortable');
                $rootScope.$emit('jarvisWidgetAdded', element)

            }
        };
    }
]);
