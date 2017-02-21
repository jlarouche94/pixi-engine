!function($w) {
  var _kbm = null;
  
  function KeyboardManager(_game, _debug) {
    this.game = _game;
    this.debug = _debug || false;
    
    this.watched = null; // List of keys
    this.state = {
      'pressed': {},
      'justpressed': {},
      'justreleased': {}
    };
    
    _kbm = this;
  }
  
  KeyboardManager.prototype.reset = function() {
    this.update();
    this.state.pressed = {};
  }
  
  KeyboardManager.prototype.watch = function() {
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
  
  KeyboardManager.prototype.isWatched = function(kc) {
    if (! this.watched) return true;
    return this.watched[kc.toString()] ? true : false;
  };
  
  KeyboardManager.prototype.update = function() {
    for (var kc in this.state.justpressed) {
      this.state.justpressed[kc] = false;
    }
    
    for (var kc in this.state.justreleased) {
      this.state.justreleased[kc] = false;
    }
  };
  
  KeyboardManager.prototype.enable = function(_watchlist) {
    this.watch(_watchlist || null);
    $w.addEventListener('keyup', keyup, false);
    $w.addEventListener('keydown', keydown, false);
  }
  
  KeyboardManager.prototype.disable = function(_watchlist) {
    this.watch(_watchlist || null);
    $w.removeEventListener('keyup', keyup);
    $w.removeEventListener('keydown', keydown);
  }
  
  KeyboardManager.prototype.isPressed = function(kc) { return this.state.pressed[kc.toString()] ? true : false; };
  KeyboardManager.prototype.wasPressed = function(kc) { return this.state.justpressed[kc.toString()] ? true : false; };
  
  KeyboardManager.prototype.isReleased = function(kc) { return !this.isPressed(kc); };
  KeyboardManager.prototype.wasReleased = function(kc) { return this.state.justreleased[kc.toString()] ? true : false; };
  
  
// Static event handler
  function keyup(event) {
    if (! _kbm) return true;
    var keycode = event.which.toString();
    
    if (! _kbm.isWatched(keycode)) return true;
    
    if (_kbm.state.pressed[keycode]) {
      _kbm.state.justreleased[keycode] = true;
    }
    
    if (_kbm.debug) console.debug("KEYUP", keycode, String.fromCharCode(keycode));
    _kbm.state.pressed[keycode] = false;
    event.stopPropagation();
    return false;
  }
  
  function keydown(event) {
    if (! _kbm) return true;
    
    var keycode = event.which.toString();
    if (! _kbm.isWatched(keycode)) return true;
    
    if (! _kbm.state.pressed[keycode]) {
      _kbm.state.justpressed[keycode] = true;
    }
    
    if (_kbm.debug) console.debug("KEYUP", keycode, String.fromCharCode(keycode));
    _kbm.state.pressed[keycode] = true;
    
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
  
  $w.KeyboardManager = KeyboardManager;
  
}(this);