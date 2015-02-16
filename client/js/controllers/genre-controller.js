app.controller('genreController', ['$scope', '$resource', '_', function($scope, $resource, _){

  Genre      = $resource('/api/genres/:slug'),
  Definition = $resource('/api/genres/:slug/definitions');

  $scope.init = function(slug){
    Genre.get({slug: slug}, function(genre){
      $scope.genre = genre;

      Definition.query({slug: genre.slug}, function(definitions){
        $scope.genre.definitions = definitions;
        $scope.topDefinition = definitions[0];
      });
    });
  };

  $scope.clearAndCloseForm = function(){
      $scope.newDefinition = {};
      $scope.showForm = false;
    }

  $scope.createSubGenre = function(){
    var subgenre = new Genre();
    subgenre.name = $scope.genreName;
    subgenre.parentGenre = $scope.genre._id

    subgenre.$save(function(result){
      window.location = '/genres/' + result.slug
    });
  };

  $scope.createDefinition = function(){
    var definition = new Definition($scope.newDefinition);
    definition.genre = $scope.genre._id;

    definition.$save({slug: $scope.genre._id}, function(result){
      $scope.genre.definitions.unshift(definition);
      $scope.topDefinition = definition;
      $scope.clearAndCloseForm();
    });
  };
}]);