// This class is used to manage game updatables.
//
// updatables are stored by type. Types include:
// - environment
// - projectile
// 
// TODO, add a may to modify the object update call parameters

class ObjectManager {
  constructor() {
    this.updatables = [];
    this.collidables = [];
  }

  // Add object to the list, all parameters after object are held for calling the updatables update function.
  add(object) {
    if (!typeof object.collidable === "undefined") {
      if (object.collidable === true) {
        this.collidables.push(object);
        return;
      }
    }
    
    // Check integrity of the object.
    if (typeof object.update === "function") {
      var args = Array.prototype.slice.call(arguments, 1); // Dont make object part of the arguements.
      var obj = {'reference': object,
                'parameters': args}
      this.updatables.push(obj);
    }
  }

  update() {
    for (var i = 0; i < this.updatables.length; i++) {
      var object = this.updatables[i];
      
      // Check if the object needs to be destroyed. (we need to decide whether the object should do it or the object manager.
      // if the object manager is going to do it perhaps we could find a better way of organizing the data.)
      if (!typeof object.toDestroy === "undefined") {
        if (object.reference.toDestroy()) {
          object.reference.destroy();
          this.updatables.splice(i, 1);
          continue;
        }
      }
      
      // Call the updatables update function with the parameters applied.
      object.reference.update.apply(object.reference, object.parameters);
    }
  }
}