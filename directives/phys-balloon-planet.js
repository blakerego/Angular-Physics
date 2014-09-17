angular.module('physBalloonPlanet', [
  'balloonModel',
  'WebGLRenderer',
  'physContainer'
  ])
.directive('physBalloonPlanet', function (
  balloonModel,
  WebGLRenderer
  ) {

  return {
    require: '?^physContainer', /// The modifier ?^ searches all parents for directive
    link: function (scope, element, attrs, physContainer) {

      var $balloonInstance, playing, renderer, container;

      function init() {
        playing = true;
        if (physContainer == null) {
          container = $('#container');
        } else {
          container = physContainer.el;
        }
        
        if ($balloonInstance) {
          $balloonInstance.destroy();
          $balloonInstance = null;
        }
        $balloonInstance = new balloonModel();
        $balloonInstance.init(container.get(0), new WebGLRenderer());
        update();
      }

      function update() {
        requestAnimationFrame(update);
        if (playing && $balloonInstance) {
          $balloonInstance.step();
        }
      }

      function onMouseEvent (event) {
        var element = $(this);
        var percentage = element.offset().top / document.body.clientHeight;
        var screenPosition = percentage * document.documentElement.clientHeight;
        $balloonInstance.mousemove(event,
                                   element.offset().left + (element.width() / 2),
                                   screenPosition + (element.height() / 2));
      }

      function onMouseLeave (event) {
        $balloonInstance.mousemove(event);
      }

      function initializeHandlers() {
        element.on('mouseenter', onMouseEvent);
        element.on('mouseover', onMouseEvent);
        element.on('mouseleave', onMouseLeave);

        /// Re-set when hovering over main image
        $('.profile-image').hover(function (event) {
          $balloonInstance.inside = false;
        });
      }

      init();
      initializeHandlers();

    }
  };

});