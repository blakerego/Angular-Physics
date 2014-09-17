angular.module('BalloonDemo', ['Attraction', 'Demo', 'physUtils'])
.factory('BalloonDemo', function (Attraction, Demo, __extends) {

  __extends(BalloonDemo, Demo);

  function BalloonDemo() {
    _ref = BalloonDemo.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  BalloonDemo.prototype.setup = function(full) {
    var attraction, i, max, p, s, _i, _results;

    if (full == null) {
      full = true;
    }
    BalloonDemo.__super__.setup.apply(this, arguments);
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

  return BalloonDemo;

});
