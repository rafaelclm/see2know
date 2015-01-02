module.controller('WidgetController', ['$scope',
    function ($scope){
        
        $scope.widgetSelected = 'jumbotron';

        $scope.widgets = [
            {
                name: 'jumbotron',
                template: 'public/directives/widgets/jumbotron/jumbotron.html',
                source: {
                    h1: 'Hello World',
                    p: 'Type your text here...',
                    a: 'Clieck me!',
                    href: '#'
                }
            },
            {
                name: 'flex-video',
                template: 'public/directives/widgets/flex-video/flex-video.html',
                source: {
                    url: '//www.youtube.com/embed/E4752NeCyNI'
                }
            },
            {
                name: 'flex-image',
                template: 'public/directives/widgets/flex-image/flex-image.html',
                source: {
                    url: 'http://www.suzanismail.com.br/wp-content/uploads/2013/12/praia-88411.jpg'
                }
            },
            {
                name: 'highlight',
                template: 'public/directives/widgets/highlight/highlight.html',
                source: {
                    language: 'java',
                    code: ''
                }
            },
            {
                name: 'custom html',
                template: 'public/directives/widgets/custom-html/custom-html.html',
                source: {
        html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' + 
                'In tempus sodales risus, scelerisque semper tortor egestas quis.Cras nec ante vulputate, ' + 
                'ornare lectus in, semper libero.Duis condimentum metus nec tempor elementum.Nulla facilisi.' + 
                ' Duis non urna non neque fermentum aliquet sed ac mi.Etiam blandit auctor lacus a pellentesque. ' + 
                'In sit amet iaculis risus.Mauris consequat lorem a neque fringilla eleifend. ' + 
                'Quisque consequat tempus mauris, ultrices sodales massa laoreet eget.'
                }
            }
        ];

        $scope.setWidgetSelected = function (widgetName) {
            $scope.widgetSelected = widgetName;
        };
    }
]);