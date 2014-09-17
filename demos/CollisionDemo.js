angular.module('CollisionDemo', ['Attraction', 'Demo', 'physUtils'])
.factory('CollisionDemo', function (Attraction, Demo, __extends) {
  
  __extends(CollisionDemo, Demo);

  function CollisionDemo() {
    this.onCollision = __bind(this.onCollision, this);    _ref = CollisionDemo.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollisionDemo.prototype.setup = function(full) {
    var attraction, bounds, collide, i, max, min, p, prob, s, _i, _results;

    if (full == null) {
      full = true;
    }
    CollisionDemo.__super__.setup.apply(this, arguments);
    this.physics.integrator = new Verlet();
    min = new Vector(0.0, 0.0);
    max = new Vector(this.width, this.height);
    bounds = new EdgeBounce(min, max);
    collide = new Collision;
    attraction = new Attraction(this.mouse.pos, 2000, 1400);
    max = full ? 350 : 150;
    prob = full ? 0.35 : 0.5;
    _results = [];
    for (i = _i = 0; 0 <= max ? _i <= max : _i >= max; i = 0 <= max ? ++_i : --_i) {
      p = new Particle(Random(0.5, 4.0));
      p.setRadius(p.mass * 4);
      p.moveTo(new Vector(Random(this.width), Random(this.height)));
      if (Random.bool(prob)) {
        s = new Spring(this.mouse, p, Random(120, 180), 0.8);
        this.physics.springs.push(s);
      } else {
        p.behaviours.push(attraction);
      }
      collide.pool.push(p);
      p.behaviours.push(collide);
      p.behaviours.push(bounds);
      _results.push(this.physics.particles.push(p));
    }
    return _results;
  };

  CollisionDemo.prototype.onCollision = function(p1, p2) {};

  return CollisionDemo;

});
