function keyboard(keyCode) {
  "use strict";
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) { key.press(); }
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) { key.release(); }
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}


// Sets up moving keys such as wasd or up left down right.
function setupMovementKeybindings(object) {

  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function() {

    object.vx = -5;
    object.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function() {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the object isn't moving vertically:
    //Stop the object
    if (!right.isDown && object.vy === 0) {
      object.vx = 0;
    }
  };

  //Up arrow key `press` method
  up.press = function() {

    object.vx = 0;
    object.vy = -5;
  };

  //Up arrow key `release` method
  up.release = function() {

    if (!down.isDown && object.vx === 0) {
      object.vy = 0;
    }
  };

  //right arrow key `press` method
  right.press = function() {

    object.vx = 5;
    object.vy = 0;
  };

  //right arrow key `release` method
  right.release = function() {

    if (!left.isDown && object.vy === 0) {
      object.vx = 0;
    }
  };

  //down arrow key `press` method
  down.press = function() {

    object.vx = 0;
    object.vy = 5;
  };

  //down arrow key `release` method
  down.release = function() {

    if (!up.isDown && object.vx === 0) {
      object.vy = 0;
    }
  };
  }