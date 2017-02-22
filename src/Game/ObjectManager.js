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

    this.objects = {};
    
    _objm = this;
  }

  ObjectManager.prototype.add = function(object, updateCb, properties) {
    if (! properties) {
      properties = {};
    }

    var obj = {'object': object,
               'properties': properties,
               'update': updateCb};

    _objm.objects.push(obj);
  };

  ObjectManager.prototype.update = function() {
    // Loop through all objects and call there update functions.
    // for (int i = 0; i < _objm.objects.length(); i++) {
    //   var obj = _objm.objects[i];
    //   obj.update(obj.object, object.properties);
    // };
  };

  ObjectManager.prototype.remove = function(object) {

  };

  $w.ObjectManager = ObjectManager;
  
}(this);