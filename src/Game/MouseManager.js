!function($w) {
  var _mm = null;
  
  function MouseManager(_game, _debug) {
    this.game = _game;
    this.debug = _debug || false;
    
    this.pressedPosition = [0, 0];
    this.state = {
      'pressed': {},
      'justpressed': {},
      'justreleased': {}
    };
    
    _mm = this;
  }
  
  MouseManager.prototype.enable = function() {
    // Add event listeners
    $w.addEventListener('mouseup', mouseup, false);
    $w.addEventListener('mousedown', mousedown, false);
  };
  
  MouseManager.prototype.disable = function() {
    // Add event listeners
    $w.removeEventListener('mouseup', mouseup);
    $w.removeEventListener('mousedown', mousedown);
  };
  
  MouseManager.prototype.update = function() {
    for (var kc in this.state.justpressed) {
      this.state.justpressed[kc] = false;
    }
    
    for (var kc in this.state.justreleased) {
      this.state.justreleased[kc] = false;
    }
  };
  
  MouseManager.prototype.isPressed = function(kc) { return this.state.pressed[kc.toString()] ? true : false; };
  MouseManager.prototype.wasPressed = function(kc) { return this.state.justpressed[kc.toString()] ? true : false; };
  
  MouseManager.prototype.isReleased = function(kc) { return !this.isPressed(kc); };
  MouseManager.prototype.wasReleased = function(kc) { return this.state.justreleased[kc.toString()] ? true : false; };
  
  // Static event handler
  function mouseup(event) {
    if (! _mm) return true;
    
    var keycode = event.which.toString();

    if (_mm.state.pressed[keycode]) {
      _mm.state.justreleased[keycode] = true;
      _mm.pressedPosition[0] = event.clientX;
      _mm.pressedPosition[1] = event.clientY;
    }
    
    if (_mm.debug) console.debug("MOUSEUP", keycode, String.fromCharCode(keycode), _mm.pressedPosition);
    _mm.state.pressed[keycode] = false;
    event.stopPropagation();
    return false;
  }
  
  function mousedown(event) {
    if (! _mm) return true;
    
    var keycode = event.which.toString();
    
    if (! _mm.state.pressed[keycode]) {
      _mm.state.justpressed[keycode] = true;
    }
    
    if (_mm.debug) console.debug("MOUSEDOWN", keycode, String.fromCharCode(keycode));
    _mm.state.pressed[keycode] = true;
    
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  
  $w.MouseManager = MouseManager;
  
}(this);