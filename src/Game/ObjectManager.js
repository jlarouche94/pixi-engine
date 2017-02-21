// This class is used to manage game objects.
//
// Objects are stored by type. Types include:
// - environment
// - projectile
// 
//

!function($w) {
  var _objm = null;
  
  function ObjectManager(_game, _debug) {
    this.game = _game;
    this.debug = _debug || false;

    this.objects = [];
    this.objProperties = {
      'name': 
    }
    
    _objm = this;
  }

  ObjectManager.prototype.add = function(object, type) {
  };

  ObjectManager.prototype.update = function() {
  };

  ObjectManager.prototype.remove = function(object) {

  };

  $w.ObjectManager = ObjectManager;
  
}(this);