module.directive('draggable', [function () {
        return {
            restrict: 'A',
            link: function (scope, element) {

                element.draggable({
                    zIndex: 999,
                    start: handleDragStart,
                    cursor: 'move',
                    revert: "invalid"
                });

                function handleDragStart(event, ui) { }
            }
        };
    }]);



