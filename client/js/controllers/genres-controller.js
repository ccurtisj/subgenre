app.controller('genresController', ['$scope',  '$resource', function($scope, $resource){

  Genre = $resource('/api/genres')

  Genre.query(function(results){
    $scope.genres = results;
  })

  $scope.createGenre = function(){
    var genre = new Genre();
    genre.name = $scope.genreName;

    genre.$save(function(result){
      $scope.genres.push(result);
      $scope.genreName  = '';
    });
  }
}]);