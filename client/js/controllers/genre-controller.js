app.controller('genreController', ['$scope', '$resource', '_', function($scope, $resource, _){

  Genre = $resource('/api/genres/:genreName');

  $scope.init = function(genreName){
    Genre.get({genreName: genreName}, function(genre){
      $scope.parentGenre = genre.parentGenre
      $scope.subGenres = genre.subGenres;
      $scope.siblingGenres = genre.siblings;
    });
  }
}]);