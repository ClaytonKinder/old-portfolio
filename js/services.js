(function () {
  'use strict';
  angular
    .module('portfolio')
    .service('ContactService', function($http, $q) {
      this.sendMail = function(name, address, message) {
        return $http({
          url: '/send',
          method: 'POST',
          params: {name: name, address: address, message: message}
        });
      }
  });
})();
