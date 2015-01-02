angular.module('ng-widget', [])
.directive('widget', ['$sce', '$timeout',
    function ($sce, $timeout) {
        return {
            restrict: 'AE',
            scope: {
                theme: '@',
                title: '@',
                template: '@',
                isEditable: '=',
                showHeader: '=',
                onRemove: '=',
                currentPage: '=',
                index: '@',
                widget: '='
            },
            template: '<div content-editable generate-id class="{{template}} panel-{{theme}} widget">' +
                        '<div class="panel-heading widget-header" ng-show="showHeader">' +
                            '<span class="text-muted"><b>{{title}}</b></span>' +
                            '<div ng-show="isEditable" class="widget-buttons">' +
                                '<a class="btn btn-{{theme}} btn-xs btn-edit widget-btn" ng-click="enableEditor()">Edit</a>' +
                                '<a class="btn btn-{{theme}} btn-xs btn-remove widget-btn" ng-click="onRemove(index, currentPage)">Remove</a>' +
                            '</div>' +
                        '</div>' +
                        '<div class="panel-body">' +
                            '<div ng-include="widget.template"></div>' +
                        '</div>' +
                     '</div>',
            link: function ($scope, element, attributes) {

                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                };

                $scope.trustSrcWithImageLiquid = function (src) {
                    $timeout(function () {
                        $('.imgLiquidFill').imgLiquid();
                    }, 2000);
                    return $sce.trustAsResourceUrl(src);
                };

            }
        }
    }
])
.directive('generateId', [
    function () {
        return {
            link: function ($scope, element, attributes) {
                
                var d = new Date().getTime();
                
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
                
                element.attr('id', uuid);
            }
        }
    }
])
.directive('contentEditable', [
    function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                
                $scope.editorEnabled = false;
                
                $scope.enableEditor = function () {
                    $scope.editorEnabled = true;
                };
                
                $scope.disableEditor = function () {
                    $scope.editorEnabled = false;
                };
                
                $scope.save = function () {
                    $scope.disableEditor();
                };
                
            }
        }
    }
])
.directive('compile', ['$compile', function ($compile) {
        
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

