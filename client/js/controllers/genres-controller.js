app.controller('genresController', ['$scope',  '$resource', '_', function($scope, $resource, _){

  Genre = $resource('/api/genres');

  var updateGenreGroups = function(){
    var groupedGenres = _.reduce($scope.genres, function(memo, genre){

      var genreId = null
      if(typeof(genre.parentGenre) == 'undefined'){
        genreId = genre._id;
      } else{
        genreId = genre.parentGenre;
      };

      var genreHash = memo[genreId] || { label: genreId, subGenres: [] }

      if(typeof(genre.parentGenre) == 'undefined'){
        genreHash.parentGenre = genre
      } else{
        genreHash.subGenres.push(genre)
      }

      memo[genreId] = genreHash;
      return memo;
    }, {});

    // console.log(genresHash)
    $scope.groupedGenres = groupedGenres;
  }

  Genre.query(function(results){
    $scope.genres = results;
    updateGenreGroups();
    // console.log($scope.genres);
  })

  $scope.createGenre = function(){
    var genre = new Genre();
    genre.name = $scope.genreName;
    genre.parentGenre = $scope.parentGenre

    genre.$save(function(result){
      $scope.genres.push(result);
      $scope.genreName  = '';
      updateGenreGroups();
    });
  }
}]);