module.directive('droppable', [function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.droppable({
                    drop: handleDropEvent,
                    tolerance: "touch"
                });
                
                function handleDropEvent(event, ui) {
                    if (ui.draggable.element !== undefined) {
                        ui.draggable.element.droppable('enable');
                    }
                    ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
                    ui.draggable.draggable('option', 'revert', "invalid");
                    ui.draggable.element = $(this);
                }

            }
        };
    }]);



