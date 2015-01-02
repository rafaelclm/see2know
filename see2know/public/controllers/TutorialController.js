module.controller('TutorialController', [
    '$scope', 'AlertsService', 'Restangular', '$translate', '$timeout', '$upload', '$sce',
    function ($scope, AlertsService, Restangular, $translate, $timeout, $upload, $sce) {
        
        var filename;
        
        this.init = function () {
            
            $scope.tutorial = (sessionStorage.tutorialEditable 
                ? JSON.parse(sessionStorage.tutorialEditable) : { pages: [{ number: 1, body: [] }] });
            
            sessionStorage.removeItem('tutorialEditable');
            
            $scope.currentPage = 1;
            $scope.totalItems = $scope.tutorial.pages.length * 8;
            
            $scope.panel = 'editor';
            $scope.showTemplates = {
                value: false
            };
            
            filename = 'generate';
        
        };
        
        this.saveLesson = function (tutorial) {
            
            var post = Restangular.one('tutorial').customPOST(tutorial);
            
            post.then(function (response) {
                
                $scope.tutorial = response.tutorial;
                $translate('LESSON_UPDATED').then(function (message) {
                    AlertsService.addAlert(message, 'alert-success');
                });
                
                $timeout(function () {
                    AlertsService.clearAlerts();
                }, 5000);

            }, function (response) {
                $translate('LESSON_NOT_UPDATED').then(function (message) {
                    AlertsService.addAlert(message, 'alert-danger');
                });
            });
        }
        
        this.uploadImage = function (file) {
            
            if (!file) return;
            
            $scope.upload = $upload.upload({
                url: '/tutorial/' + filename + '/image',
                data: { myObj: $scope.myModelObj },
                file: file
            }).progress(function (evt) {
                
                $scope.progressImageSend = parseInt(100.0 * evt.loaded / evt.total);

            }).success(function (data, status, headers, config) {
                
                var uuid = $scope.generateUUID();
                
                filename = data.filename;
                $scope.tutorial.imageLesson = '/tutorial/image/' + filename + '?uuid=' + uuid;
                
                $timeout(function () {
                    $('#image-tutorial').imgLiquid();
                }, 2000);

            });
   
        };
        
        this.insertWidget = function (widget, currentPage) {
            
            $scope.tutorial.pages[currentPage - 1].body.push(widget);
            
            $translate('TEMPLATE_INSERTED').then(function (message) {
                AlertsService.addAlert(message, 'alert-success');
            });
            
            $scope.showTemplates.value = false;
                
        };
        
        this.removeWidget = function ($index, currentPage) {
            $scope.tutorial.pages[currentPage - 1].body.splice($index, 1);
        };
        
        this.showPreview = function () {
            $scope.preview = '';
            $scope.tutorial.pages.forEach(function (page) {
                page.body.forEach(function (widget) {
                    $scope.preview = $scope.preview.concat(widget.content).concat('<br/>');
                });
            });
        };
        
        this.addPage = function () {
            
            var page = {
                number: $scope.tutorial.pages.length + 1,
                body: new Array()
            };
            
            $scope.tutorial.pages.push(page);
            $scope.currentPage = $scope.tutorial.pages.length;
            $scope.totalItems += 8;
        };
        
        this.removePage = function (currentPage) {
            if ($scope.tutorial.pages.length > 1) {
                $scope.tutorial.pages.splice((currentPage - 1), 1);
                $scope.totalItems = $scope.tutorial.pages.length * 8;
            }
        };
        
        this.showTemplates = function () {
            $scope.showTemplates.value = ($scope.showTemplates.value ? false: true);
        };


    }
]);