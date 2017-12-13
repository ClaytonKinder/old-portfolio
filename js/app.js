(function () {
  'use strict';

  angular
    .module('portfolio', [
      'ngRoute',
      'ngAnimate',
      'underscore',
    ])
    .config(function ($routeProvider, $locationProvider) {
      $locationProvider.hashPrefix('');
      $routeProvider
        .when('/', {
          redirectTo: '/profile'
        })
        .when('/projects', {
          templateUrl: 'views/projects.html',
          controller: 'MainController',
          activePage: 'projects',
          activePageNum: 1
        })
        .when('/profile', {
          templateUrl: 'views/profile.html',
          controller: 'MainController',
          activePage: 'profile',
          activePageNum: 2
        })
        .when('/contact', {
          templateUrl: 'views/contact.html',
          controller: 'MainController',
          activePage: 'contact',
          activePageNum: 3
        })
        .when('/404', {
          templateUrl: 'views/404.html'
        })
        .otherwise({
          redirectTo: '/404'
        });
    })
    .directive('setClassWhenAtTop', function ($window, $rootScope) {
      var $win = angular.element($window);

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var ua = navigator.userAgent;
          var isMobile = /Mobile/.test(ua);
          var topClass = attrs.setClassWhenAtTop,
              headerHeight = angular.element('header').height();
          scope.lastScrollTop = 0;
          scope.direction = "";

          $win.on('resize', function() {
            headerHeight = angular.element('header').height();
            if ($win.scrollTop() >= headerHeight) {
              element.addClass(topClass);
            } else {
              element.removeClass(topClass);
            }
          })

          $win.on('scroll', function (e) {
            scope.st = window.pageYOffset;
            if (scope.st > scope.lastScrollTop) {
              scope.direction = 'down';
            } else {
              scope.direction = 'up';
            }
            headerHeight = angular.element('header').height();
            if ($win.scrollTop() >= headerHeight) {
              element.addClass(topClass);
            } else {
              element.removeClass(topClass);
              if (scope.dropdownOpen === true && scope.direction === 'up') {
                scope.dropdownOpen = false;
              }
            }
            scope.lastScrollTop = scope.st;
            scope.$apply();
          });
        }
      };
    })
    .directive('setClassWhenMobile', function ($window, $rootScope) {
      var $win = angular.element($window);

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          var ua = navigator.userAgent;
          var isMobile = /Mobile/.test(ua);
          var mobileClass = attrs.setClassWhenMobile;

          if (isMobile) {
            element.addClass(mobileClass);
          } else {
            element.removeClass(mobileClass);
          }
        }
      };
    })
    .directive('showWhen', function($compile, $timeout) {
      var directive = {
        restrict: 'A',
        priority: 1000,
        // link: showWhenPostLink
      };
      var ua = navigator.userAgent;
      var isMobile = /Mobile/.test(ua);

      var isChrome = window.chrome !== undefined;

      return directive;
    })
    .directive('toggleProjectInfo', function($compile, $timeout) {
      return {
        restrict: 'A',
        link: function (scope, element) {
          scope.selectProject = function($event) {
            var project = $event.currentTarget;
            var target = $event.target;
            if (angular.element(target).prop('tagName') === 'A' || angular.element(target).prop('tagName') === 'I') {} else {
              angular.element(project).toggleClass('activeProject');
            }
          }
        }
      };
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
