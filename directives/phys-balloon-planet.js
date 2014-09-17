angular.module('physBalloonPlanet', ['balloonModel'])
.directive('physBalloonPlanet', function (balloonModel) {

  return {
    link: function (scope, element, attrs) {
    var $balloonInstance = balloonModel;
    $balloonInstance.inside = false;
    $(function () {
      $('.focusOnHover').hover(function (event) {
        var element = $(this);
        var percentage = element.offset().top / document.body.clientHeight;
        var screenPosition = percentage * document.documentElement.clientHeight;
        $balloonInstance.mousemove(event,
                                   element.offset().left + (element.width() / 2),
                                   screenPosition + (element.height() / 2));
      }, function(event) {
        // Reset to center.
        $balloonInstance.mousemove(event);
      });

      /// Re-set when hovering over main image
      $('.profile-image').hover(function (event) {
        $balloonInstance.inside = false;
      });
    });

    }
  };

});