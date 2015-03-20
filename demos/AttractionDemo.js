angular.module('AttractionDemo', ['Attraction', 'Demo', 'physUtils'])
.factory('AttractionDemo', ['Attraction', 'Demo', '__extends', function (Attraction, Demo, __extends) {
 

  __extends(AttractionDemo, Demo);

  function AttractionDemo() {
    _ref = AttractionDemo.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AttractionDemo.prototype.setup = function(full) {
    var attraction, bounds, collide, i, max, min, p, repulsion, _i, _results;

    if (full == null) {
      full = true;
    }
    AttractionDemo.__super__.setup.call(this, full);
    min = new Vector(0.0, 0.0);
    max = new Vector(this.width, this.height);
    bounds = new EdgeBounce(min, max);
    this.physics.integrator = new Verlet();
    attraction = new Attraction(this.mouse.pos, 1200, 1200);
    repulsion = new Attraction(this.mouse.pos, 200, -2000);
    collide = new Collision();
    max = full ? 400 : 200;
    _results = [];
    for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {
      p = new Particle(Random(0.1, 3.0));
      p.setRadius(p.mass * 4);
      p.moveTo(new Vector(Random(this.width), Random(this.height)));
      p.behaviours.push(attraction);
      p.behaviours.push(repulsion);
      p.behaviours.push(bounds);
      p.behaviours.push(collide);
      collide.pool.push(p);
      _results.push(this.physics.particles.push(p));
    }
    return _results;
  };

  return AttractionDemo;
}]);

