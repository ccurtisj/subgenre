app.controller('genreController', ['$scope', '$resource', '_', function($scope, $resource, _){

  Genre = $resource('/api/genres/:slug');

  $scope.init = function(slug){
    Genre.get({slug: slug}, function(genre){
      $scope.genre = genre;
    });
  }

  $scope.createSubGenre = function(){
    var subgenre = new Genre();
    subgenre.name = $scope.genreName;
    subgenre.parentGenre = $scope.genre._id

    console.log(subgenre)

    subgenre.$save(function(result){
      console.log(result)
      window.location = '/genres/' + result.slug
    });
  }
}]);