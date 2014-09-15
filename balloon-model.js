angular.module('balloonModel', [])
.factory('balloonModel', function () {

  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  var COLOURS = ['22242D', '3D4153', '485072', '6673A3', '97A3D3'];;

  function BalloonModel() {
    this.mousemove = __bind(this.mousemove, this);
    this.resize = __bind(this.resize, this);    this.physics = new Physics();
    this.mouse = new Particle();
    this.mouse.fixed = true;
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.renderTime = 0;
    this.counter = 0;
  }

  BalloonModel.prototype.setup = function(full) {
    var attraction, i, max, p, s, _i, _results;

    if (full === null) {
      full = true;
    }
    this.physics.integrator = new ImprovedEuler();
    attraction = new Attraction(this.mouse.pos);
    max = full ? 400 : 200;
    _results = [];
    for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {
      p = new Particle(Random(0.25, 4.0));
      p.setRadius(p.mass * 8);
      p.behaviours.push(new Wander(0.2));
      p.behaviours.push(attraction);
      p.moveTo(new Vector(Random(this.width), Random(this.height)));
      s = new Spring(this.mouse, p, Random(30, 300), 1.0);
      this.physics.particles.push(p);
      _results.push(this.physics.springs.push(s));
    }
    return _results;
  };

  /* Handler for window resize event.
  */


  BalloonModel.prototype.resize = function(event) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    return this.renderer.setSize(this.width, this.height);
  };


  BalloonModel.prototype.init = function(container, renderer) {
    var particle, _i, _len, _ref, _ref1;
    this.container = container;
    this.renderer = renderer !== null ? renderer : new WebGLRenderer();
    this.setup(renderer.gl !== null);
    _ref = this.physics.particles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      particle = _ref[_i];
      if ((_ref1 = particle.colour) == null) {
        particle.colour = Random.item(Demo.COLOURS);
      }
    }
    document.addEventListener('touchmove', this.mousemove, false);
    document.addEventListener('mousemove', this.mousemove, false);
    document.addEventListener('resize', this.resize, false);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.mouse = this.mouse;
    this.renderer.init(this.physics);
    this.mousemove({'preventDefault' : function (){}} );

    /// MOVE THIS TO DIRECTIVE
    // var $balloonInstance = this;
    // $balloonInstance.inside = false;
    // $(function () {
    //   $('.focusOnHover').hover(function (event) {
    //     var element = $(this);
    //     var percentage = element.offset().top / document.body.clientHeight;
    //     var screenPosition = percentage * document.documentElement.clientHeight;
    //     $balloonInstance.mousemove(event,
    //                                element.offset().left + (element.width() / 2),
    //                                screenPosition + (element.height() / 2));
    //   }, function(event) {
    //     // Reset to center.
    //     $balloonInstance.mousemove(event);
    //   });

    //   /// Re-set when hovering over main image
    //   $('.profile-image').hover(function (event) {
    //     $balloonInstance.inside = false;
    //   });
    // });

    return this.resize();
  };

  /* Update loop.
  */
  BalloonModel.prototype.step = function() {
    this.physics.step();
    if ((this.renderer.gl != null) || ++this.counter % 3 === 0) {
      return this.renderer.render(this.physics);
    }
  };

  /* Clean up after yourself.
  */


  BalloonModel.prototype.destroy = function() {
    var error;

    document.removeEventListener('touchmove', this.mousemove, false);
    document.removeEventListener('mousemove', this.mousemove, false);
    document.removeEventListener('resize', this.resize, false);
    try {
      container.removeChild(this.renderer.domElement);
    } catch (_error) {
      error = _error;
    }
    this.renderer.destroy();
    this.physics.destroy();
    this.renderer = null;
    this.physics = null;
    return this.mouse = null;
  };

  /* Handler for window mousemove event.
  */


  BalloonModel.prototype.mousemove = function(event) {
    var touch;

    event.preventDefault();
    if (event.touches && !!event.touches.length) {
      touch = event.touches[0];
      return this.mouse.pos.set(touch.pageX, touch.pageY);
    } else {
      return this.mouse.pos.set(event.clientX, event.clientY);
    }
  };


  return BalloonModel;
});
