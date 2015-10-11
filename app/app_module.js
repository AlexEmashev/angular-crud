// Application module with name 'simpleCrud'
// Using bootstrap component to organize the UI
// ngAnimate - used by bootsrap for modal fade-in\fade-out effects
// Angular-Translate i18n module to load translations for validation
// Sanitize - module for protection from XSS
// Validation - validation module
// var app is the reference that other parts of the application use.
var app = angular.module('simpleCrud', ['ui.bootstrap', 'ngAnimate', 'ui.select', 'ngSanitize',
                                       'ghiscoding.validation', 'pascalprecht.translate']);

// Include validation languages
app.config(function($translateProvider){
  $translateProvider.useStaticFilesLoader({
    prefix: 'js/angular-validation/locales/',
    suffix: '.json'
  });
  
  // Define translation map to use on startup
  $translateProvider.preferredLanguage('en');
})