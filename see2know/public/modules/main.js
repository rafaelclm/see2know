var module = angular.module('openedu', [
    'ui.router', 'wu.masonry', 'restangular', 'ui.bootstrap', 'ngAnimate', 'ng-widget',
    'ui.codemirror', 'angularMoment', 'translate', 'ngSanitize', 'hljs', 'angularFileUpload', 'textAngular', 'ui.sortable']);

module.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube)\.com(/.*)?$', 'self']);
    }]);

module.config(function ($translateProvider) {
    $translateProvider.translations('en_us', {
        TITLE: 'Hello',
        FOO: 'This is a paragraph.',
        BUTTON_LANG_EN: 'english',
        BUTTON_LANG_DE: 'german'
    });
    $translateProvider.translations('pt_br', pt_br);
    $translateProvider.preferredLanguage('pt_br');
});