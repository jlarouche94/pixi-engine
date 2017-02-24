class KeyboardManager {
  constructor(_game, _debug) {
    this.game = game;
    this.debug = _debug || false;
    
    this.watched = null; // List of keys
    this.state = {
      'pressed': {},
      'justpressed': {},
      'justreleased': {}
    };

  }

  watch() {
    if (arguments.length == 1 && arguments[0] == null) {
      this.watched = null;
      return this;
    }
    
    if (! this.watched) this.watched = {};
    
    var _keycodes = (arguments.length == 1 && typeof(arguments[0]) == "object") ? arguments[0] : arguments;
    
    for (var idx in _keycodes) {
      this.watched[ _keycodes[idx].toString() ] = true;
    }
  }
  
  isWatched(kc) {
    if (! this.watched) return true;
    return this.watched[kc.toString()] ? true : false;
  };
  
  update() {
    for (var kc in this.state.justpressed) {
      this.state.justpressed[kc] = false;
    }
    
    for (var kc in this.state.justreleased) {
      this.state.justreleased[kc] = false;
    }
  };
  
  enable (_watchlist) {
    this.watch(_watchlist || null);
    window.addEventListener('keyup', (event) => this.keyup(event), false);
    window.addEventListener('keydown', (event) => this.keydown(event), false);
  }
  
  disable(_watchlist) {
    this.watch(_watchlist || null);
    window.removeEventListener('keyup', this.keyup);
    window.removeEventListener('keydown', this.keydown);
  }
  
  isPressed(kc) { return this.state.pressed[kc.toString()] ? true : false; };
  wasPressed(kc) { return this.state.justpressed[kc.toString()] ? true : false; };
  
  isReleased(kc) { return !this.isPressed(kc); };
  wasReleased(kc) { return this.state.justreleased[kc.toString()] ? true : false; };
  
  
  // Static event handler
  keyup(event) {
    if (! this) return true;
    var keycode = event.which.toString();
    
    if (! this.isWatched(keycode)) return true;
    
    if (this.state.pressed[keycode]) {
      this.state.justreleased[keycode] = true;
    }
    
    if (this.debug) console.debug("KEYUP", keycode, String.fromCharCode(keycode));
    this.state.pressed[keycode] = false;
    event.stopPropagation();
    return false;
  }
  
  keydown(event) {
    if (! this) return true;
    
    var keycode = event.which.toString();
    if (! this.isWatched(keycode)) return true;
    
    if (! this.state.pressed[keycode]) {
      this.state.justpressed[keycode] = true;
    }
    
    if (this.debug) console.debug("KEYUP", keycode, String.fromCharCode(keycode));
    this.state.pressed[keycode] = true;
    
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  reset() {
    this.update();
    this.state.pressed = {};
  }
}
