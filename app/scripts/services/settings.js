'use strict';
angular.module('foodPlanOrganizerApp')
.factory('Settings', function() {
  var queryParams = {};
  var queryParts = window.location.search.slice(1).split('=');
  for (var i = 0; i < queryParts.length; i += 2) {
    queryParams[queryParts[i]] = queryParts[i + 1];
  }

  return {
    params: queryParams,
    host: function() {
      var backend = queryParams.backend;
      if (backend === undefined) {
        backend = ':8080';
      }
      return 'http://localhost' + backend;
    }
  };
});