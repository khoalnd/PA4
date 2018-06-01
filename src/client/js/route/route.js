var app = angular.module("Lyrics", [
	"ngRoute",
    "firebase",
    "ngCkeditor",
]);


app.config(function($routeProvider) {
    $routeProvider
    .when("/submit", {
        templateUrl : "view/submit_lyrics.html"
    })
    .when("/lyrics", {
        templateUrl : "view/detail_lyrics.html"
    })
    .when("/search", {
        templateUrl : "view/search_lyrics.html"
    })
    .when("/", {
        templateUrl : "view/main.html"
    })
});