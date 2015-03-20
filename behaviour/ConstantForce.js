angular.module('ConstantForce', ['Behaviour', 'physUtils'])
.factory('ConstantForce', ['Behaviour', '__extends', '__hasProp', function (Behaviour, __extends, __hasProp) {

  __extends(ConstantForce, Behaviour);

  function ConstantForce(force) {
    this.force = force != null ? force : new Vector();
    ConstantForce.__super__.constructor.apply(this, arguments);
  }

  ConstantForce.prototype.apply = function(p, dt, index) {
    return p.acc.add(this.force);
  };

  return ConstantForce;

}]);
