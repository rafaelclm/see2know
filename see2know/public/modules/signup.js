var module = angular.module('signup', ['restangular', 'translate']);

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