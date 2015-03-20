angular.module('physContainer', [])
.directive('physContainer', [function () {

  return {
    el: null,
    link: function (scope, element) {
      this.el = element;
    }
  };
}]);