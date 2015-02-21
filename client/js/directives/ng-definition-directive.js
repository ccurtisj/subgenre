app.directive('ngDefinition', function(){
  return {
    restrict: 'E',
    scope: { definition: '='},
    templateUrl: '/templates/ng-definition-template.html'
  }
});