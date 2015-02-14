app.controller('genreController', ['$scope', '$resource', '_', function($scope, $resource, _){

  Genre = $resource('/api/genres/:slug');

  $scope.init = function(slug){
    Genre.get({slug: slug}, function(genre){
      $scope.genre = genre;
    });
  }
}]);