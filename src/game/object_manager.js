// This class is used to manage game objects.
//
// Objects are stored by type. Types include:
// - environment
// - projectile
// 
// TODO, add a may to modify the object update call parameters

class ObjectManager {
  constructor(objects) {
    if (!objects) {
      this.objects = []
    } else {
      this.objects = objects;
    }
  }

  // Add object to the list, all parameters after object are held for calling the objects update function.
  add(object) {
    
    // Check integrity of the object (should have an update function. Until we add a way to have more than one type of object.)
    if (!typeof object.update === "function") {
      console.error("Object added has no update function.");
      return;
    }
    
    var args = Array.prototype.slice.call(arguments, 1); // Dont make object part of the arguements.
    var obj = {'object': object,
              'parameters': args}
    this.objects.push(obj);
    console.log(obj["parameters"]);
  }

  update() {
    for (var i = 0; i < this.objects.length; i++) {
      // Call the objects update function with the parameters applied.
      this.objects[i].object.update.apply(this.objects[i].object, this.objects[i].parameters);
    }
  }
}