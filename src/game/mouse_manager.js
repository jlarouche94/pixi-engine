class MouseManager {
  constructor (_game, _debug) {
    this.game = _game;
    this.debug = _debug || false;
    
    this.pressedPosition = new PIXI.Point(0, 0);
    this.state = {
      'pressed': {},
      'justpressed': {},
      'justreleased': {}
    };
  }
      
  enable() {
    // Add event listeners
    window.addEventListener('mouseup', (event) => this.mouseup(event), false);
    window.addEventListener('mousedown', (event) => this.mousedown(event), false);
  };
  
  disable() {
    // Add event listeners
    window.removeEventListener('mouseup', mouseup);
    window.removeEventListener('mousedown', mousedown);
  };
  
  update() {
    for (var kc in this.state.justpressed) {
      this.state.justpressed[kc] = false;
    }
    
    for (var kc in this.state.justreleased) {
      this.state.justreleased[kc] = false;
    }
  };
  
  isPressed(kc) { return this.state.pressed[kc.toString()] ? true : false; };
  wasPressed(kc) { return this.state.justpressed[kc.toString()] ? true : false; };
  
  isReleased(kc) { return !this.isPressed(kc); };
  wasReleased(kc) { return this.state.justreleased[kc.toString()] ? true : false; };
  
  // Static event handler
  mouseup(event) {
    if (! this) return true;
    
    var keycode = event.which.toString();

    if (this.state.pressed[keycode]) {
      this.state.justreleased[keycode] = true;
      this.pressedPosition.x = event.clientX;
      this.pressedPosition.y = event.clientY;
    }
    
    if (this.debug) console.debug("MOUSEUP", keycode, String.fromCharCode(keycode), this.pressedPosition);
    this.state.pressed[keycode] = false;
    event.stopPropagation();
    return false;
  }
  
  mousedown(event) {
    if (! this) return true;
    
    var keycode = event.which.toString();
    
    if (! this.state.pressed[keycode]) {
      this.state.justpressed[keycode] = true;
    }
    
    if (this.debug) console.debug("MOUSEDOWN", keycode, String.fromCharCode(keycode));
    this.state.pressed[keycode] = true;
    
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  
}