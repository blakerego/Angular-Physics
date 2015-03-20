angular.module('Collision', ['Behaviour', 'physUtils'])
.factory('Collision', ['Behaviour', '__extends', '__hasProp', function (Behaviour, __extends, __hasProp) {

  __extends(Collision, Behaviour);

  function Collision(useMass, callback) {
    this.useMass = useMass != null ? useMass : true;
    this.callback = callback != null ? callback : null;
    this.pool = [];
    this._delta = new Vector();
    Collision.__super__.constructor.apply(this, arguments);
  }

  Collision.prototype.apply = function(p, dt, index) {
    var dist, distSq, mt, o, overlap, r1, r2, radii, _i, _len, _ref, _results;

    _ref = this.pool.slice(index);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      o = _ref[_i];
      if (!(o !== p)) {
        continue;
      }
      (this._delta.copy(o.pos)).sub(p.pos);
      distSq = this._delta.magSq();
      radii = p.radius + o.radius;
      if (distSq <= radii * radii) {
        dist = Math.sqrt(distSq);
        overlap = (p.radius + o.radius) - dist;
        overlap += 0.5;
        mt = p.mass + o.mass;
        r1 = this.useMass ? o.mass / mt : 0.5;
        r2 = this.useMass ? p.mass / mt : 0.5;
        p.pos.add(this._delta.clone().norm().scale(overlap * -r1));
        o.pos.add(this._delta.norm().scale(overlap * r2));
        _results.push(typeof this.callback === "function" ? this.callback(p, o, overlap) : void 0);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Collision;

}]);


