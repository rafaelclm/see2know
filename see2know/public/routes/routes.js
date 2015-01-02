module.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('index', {
        url: "/",
        templateUrl: '/public/views/partials/home.html'
    })
    .state('tutorial', {
        url: "/tutorial",
        templateUrl: '/public/views/partials/tutorial.html'
    })
    .state('favorites', {
        url: "/favorites",
        templateUrl: '/public/views/partials/favorites.html'
    })
    .state('my-tutorials', {
        url: "/my-tutorials",
        templateUrl: '/public/views/partials/my.tutorials.html'
    })
    .state('editor', {
        url: '/editor',
        templateUrl: '/public/views/partials/editor.html'
    })
});