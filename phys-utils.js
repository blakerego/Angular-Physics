angular.module('physUtils', [])

.factory('__hasProp', function () {
  return {}.hasOwnProperty;
})


.factory('__extends', function (__hasProp) {
 return function(child, parent) {
   for (var key in parent) {
     if (__hasProp.call(parent, key)) child[key] = parent[key];
   }
   function ctor() {
     this.constructor = child;
   }
   ctor.prototype = parent.prototype;
   child.prototype = new ctor();
   child.__super__ = parent.prototype;
   return child;
 };
 
})

.factory('__bind', function () {
  return function(fn, me){
    return function(){ return fn.apply(me, arguments);
    };
  };
})

;