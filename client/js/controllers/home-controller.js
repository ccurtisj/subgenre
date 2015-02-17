app.controller('homeController', ['$scope',  '$resource', '_', function($scope, $resource, _){

  $scope.searchQuery = undefined;
  $scope.newGenre = {};
  Genre = $resource('/api/genres');

  // var updateGenreGroups = function(){
  //   var groupedGenres = _.reduce($scope.genres, function(memo, genre){

  //     var genreId = null
  //     if(typeof(genre.parentGenre) == 'undefined'){
  //       genreId = genre._id;
  //     } else{
  //       genreId = genre.parentGenre;
  //     };

  //     var genreHash = memo[genreId] || { label: genreId, subGenres: [] }

  //     if(typeof(genre.parentGenre) == 'undefined'){
  //       genreHash.parentGenre = genre
  //     } else{
  //       genreHash.subGenres.push(genre)
  //     }

  //     memo[genreId] = genreHash;
  //     return memo;
  //   }, {});

  //   // console.log(genresHash)
  //   $scope.groupedGenres = groupedGenres;
  // }

  $scope.initHomepage = function(){
    Genre.query({root: true}, function(results){
      $scope.parentGenres = results
      // updateGenreGroups();
      // console.log($scope.genres);

      $('.typeahead').typeahead({
        highlight: true
      },{
        displayKey: 'name',
        source: typeaheadDataSource,
        templates: {
          empty: function(context){
            return '<div class="footer">We haven\'t seen "' + context.query + '" before. <a data-toggle="modal" href="#genre-form">Why don\'t you Add it?</a></div>'
          },
          suggestion: function(genre){
            return genre.name;
          }
        }
      });

      $('.typeahead').on('typeahead:selected', function(evt, genre, dataset){
        window.location = '/genres/' + genre.slug
      });

      $('body').on('show.bs.modal',  function(){
        $scope.newGenre.name = $scope.searchQuery;
        $scope.$apply();
      });
    });

    Genre.query({}, function(genres){
      $scope.genres = genres;
    })
  };

  var typeaheadDataSource = function(query, cb){
    var matches = []

    _.each($scope.genres, function(genre){
      if(genre.name.match(new RegExp(query, 'i'))){
        matches.push(genre);
      }
    });

    cb(matches);
  }

  $scope.createSubGenre = function(){
    var genre = new Genre($scope.newGenre);
    genre.$save(function(genre){
      window.location = '/genres/' + genre.slug
    });
  };
}]);