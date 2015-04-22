angular.module('balloons', [
  'physUtils',
  'Demo',
  'Attraction',
  'Wander'
  ])
.factory('BalloonModel', ['Demo', 'Attraction', 'Wander', '__bind', '__extends', function (
  Demo,
  Attraction,
  Wander,
  __bind,
  __extends
  ) {

  // var COLOURS = ['22242D', '3D4153', '485072', '6673A3', '97A3D3'];
  var COLOURS = ['33342D', '3D4153', '485072', '6673A3', '97A3D3'];

  var ref;
  function BalloonModel() {
    _ref = BalloonModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  __extends(BalloonModel, Demo);

  BalloonModel.prototype.setup = function(full) {
    var attraction, i, max, p, s, _i, _results;

    if (full === null) {
      full = true;
    }
    this.physics.integrator = new ImprovedEuler();
    attraction = new Attraction(this.mouse.pos);
    max = full ? 50 : 0;
    _results = [];
    for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {
      p = new Particle(Random(0.25, 4.0));
      p.setRadius(p.mass * 8);
      p.behaviours.push(new Wander(0.2));
      p.behaviours.push(attraction);
      p.moveTo(new Vector(Random(this.width), Random(this.height)));
      // s = new Spring(this.mouse, p, Random(30, 300), 1.0);
      s = new Spring(_results[i-1], p, Random(30, 300), 1.0);
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
        particle.colour = Random.item(COLOURS);
      }
    }
    document.addEventListener('touchmove', this.mousemove, false);
    document.addEventListener('mousemove', this.mousemove, false);
    document.addEventListener('resize', this.resize, false);
    this.container.appendChild(this.renderer.domElement);
    this.renderer.mouse = this.mouse;
    this.renderer.init(this.physics);
    this.mousemove({'preventDefault' : function (){}} );
    this.inside = false;
    this.initiated = true;
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
    this.mouse = null;
  };

  /* Handler for window mousemove event.
  */


  BalloonModel.prototype.mousemove = function(event, x, y) {
    var touch;

    function moveForMobile(touches) {
      /// For mobile devices, center of gravity will be finter.
      touch = event.touches[0];
      return this.mouse.pos.set(touch.pageX, touch.pageY);
    }

    event.preventDefault();
    if (event.touches && !!event.touches.length) {
      moveForMobile(touches);
    } else {
      if (!this.inside && (x == null || y == null)) {
        return this.mouse.pos.set(this.width / 2, this.height / 3);
      } else if (event.type === "mouseenter" || event.type === "mouseover") {
        this.inside = true;
        if (this.mouse != null) {
          return this.mouse.pos.set(x, y);
        }
      }
    }
  };

  return BalloonModel;
}])
.service('balloonModelInstance', ['BalloonModel', function (BalloonModel) {
  var instance;
  if (instance == null) {
    instance = new BalloonModel();
  }
  return instance;
}]);
