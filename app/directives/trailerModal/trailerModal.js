'use strict';

tlMovies.directive('trailerModal', function(){
  return {
    restrict: "E",
    templateUrl: 'trailerModal/trailerModal.html',
    controller: 'trailerModalCtrl',
    scope: {
      videoUrl: '='
    },
    link: function (scope, elem, attrs) {}
  }
});