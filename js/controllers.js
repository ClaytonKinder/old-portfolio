(function () {
  'use strict';
  angular
    .module('portfolio')
    .controller('MainController', function($scope, $route, $http, $q, ContactService, $location, $window, $timeout) {
      $scope.$route = $route;
      $scope.projectOpen = false;
      $scope.date = new Date();

      $scope.sendMail = function(name, address, message) {
        angular.element('.buttonDefault').hide();
        angular.element('i.fa-check').hide();
        angular.element('i.fa-times').hide();
        angular.element('.loader').show();
        angular.element('button').removeClass('success').removeClass('failure');

        ContactService.sendMail(name, address, message).then(function(response){
          isMessageSent(response.data.messageSent, response.data.errorMessage);
        },function (e) {
          console.warn('An error has occurred.', e);
        });
      }

      $scope.$watch(function() {
          return $('.viewWrapper').height(); // Return the window height value
      }, function(newValue, oldValue) {
          $('#pageBlock').css('min-height', newValue);
      });

      $scope.clickedMoreLink = function() {
        var headerHeight = angular.element('header').height();
        setTimeout(function(){
          $(window).scrollTop(headerHeight);
        }, 250)
      }

      var isMessageSent = function(messageSent, errorMessage) {
        if (messageSent) {
          angular.element('.loader').hide();
          angular.element('i.fa-check').show();
          angular.element('button').addClass('success');
          $scope.submitMessage = 'Your message has been sent successfully. I\'ll be in touch with you shortly!'
          $scope.submitMessage2 = 'You will be returned to the home page in 3 seconds.';
          $scope.contactName = '';
          $scope.contactEmail = '';
          $scope.contactMessage = '';
          angular.element('#contactName').val('');
          angular.element('#contactEmail').val('');
          angular.element('#contactMessage').val('');
          $scope.contactForm.$setPristine();
          setTimeout(function(){
            $window.location.assign('/');
            $scope.$apply()
          }, 3000)
        } else {
          angular.element('.loader').hide();
          angular.element('i.fa-times').show();
          angular.element('button').addClass('failure');
          $scope.submitMessage = 'Oops! Something went wrong: ' + errorMessage;
          setTimeout(function(){
            angular.element('i.fa-times').hide();
            angular.element('.buttonDefault').show();
            angular.element('button').removeClass('failure');
          }, 3000)
        }
      }
    })
    .controller('NavController', function($scope, $route, $window, $rootScope, $http) {
      $scope.$route = $route;
      var ua = navigator.userAgent;
      var isMobile = /Mobile/.test(ua);
      $scope.isMobile = isMobile;
      $scope.dropdownOpen = false;

      var isIE = function() {
        var ua = window.navigator.userAgent;
        var isIEBoolean = ua.indexOf("MSIE ");
        if (isIEBoolean > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
          angular.element('nav').addClass('microsoft');
          angular.element('header').addClass('microsoft');
          return true;
        } else {
          return false;
        }
      }

      isIE();

      if (!isMobile) {
        angular.element($window).bind('scroll', function() {
          scrollNavOpacity();
        })

        angular.element($window).bind('resize', function() {
          scrollNavOpacity();
        })

        var scrollNavOpacity = function() {
          var target = angular.element('header');
          var targetHeight = target.outerHeight();
          var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
          var scrollPercentReverse = (100 - (100 * scrollPercent)) / 100;
          $scope.navOpacity = scrollPercentReverse;
          $scope.$apply();
        }
      } else {
        angular.element('header').css('height', $window.innerHeight);
        $scope.navOpacity = 1;
      }

      $scope.clickedNavLink = function() {
        var headerHeight = angular.element('header').height();
        setTimeout(function(){
          $(window).scrollTop(headerHeight);
        }, 250);
      }
    })
})();
