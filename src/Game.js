!function($w, KeyboardManager, MouseManager) {
  function Game(_w, _h, _bgColor) {
    _w = _w || 640;
    _h = _h || 480;
    _bgColor = _bgColor || 0x00000000;
    
    this._config = {
      'resolution': { 'width': _w, 'height': _h },
      'backgroundColor': _bgColor,
      'FPS': 60
    };
    
    this.DEBUG = true;
    
    this.renderer = null;
    this._root = null;
    
    this.kbm = null;
    this.mm = null;
    
    this._i_runloop = null;
  }
  
  Game.prototype.buildRenderer = function(rendererTarget, rendererClass) {
    if (! rendererClass) rendererClass = PIXI.WebGLRenderer;
    if (! rendererTarget) rendererTarget = $w.document.body;
    
    this.renderer = new rendererClass(this.config().resolution.width,
                                     this.config().resolution.height);
    this.renderer.backgroundColor = this.config('backgroundColor');
    
    rendererTarget.appendChild( this.renderer.view );
    this._root = new PIXI.Container();
  };
  
  Game.prototype.init = function() {
    this.buildRenderer();
    
    this.kbm = new KeyboardManager(this, this.DEBUG);
    this.mm = new MouseManager(this, this.DEBUG);
    
    return true;
  };
  
  Game.prototype.draw = function() {
    this.renderer.render(this._root);
  };
  
  Game.prototype.update = function() {
    if (this.kbm) this.kbm.update();
    if (this.mm) this.mm.update();
    
    return true;
  };
  
  Game.prototype.config = function(e) {
    return e ? this._config[e] : this._config;
  };
  
  // Getters start
  Game.prototype.root = function() {
    return this._root;
  };
  
  Game.prototype.keyboard = function() {
    return this.kbm;
  };
  
  Game.prototype.mouse = function() {
    return this.mm;
  };
  // Getters end.
  
  Game.prototype.run = function() {
    if (this.init() == true) {
      var _game = this;
      
      var msPerFrame = Math.floor( (1 / this.config('FPS')) * 1000);
      
      var _frame = function() {
        _game.draw();
      };
      
      this._i_runloop = setInterval(function() {
        if ( _game.update() ) {
          requestAnimationFrame(_frame);
        } else {
          console.info('Run loop terminated by update()');
          clearInterval(_game._i_runloop);
          _game._cleanUp();
        }
      }, msPerFrame);
    } else {
      console.log("Error: init() returned non-TRUE");
      return false;
    }
  };
  
  Game.prototype._cleanUp = function() {
    if (this._root) this._root.removeChidlren();
  };
  
  Game.prototype.terminate = function() {
    console.info('Run loop terminated request');
    clearInterval(this._i_runloop);
    this._cleanUp();
  }
  
  Game.extendTo = function(cl) {
    for (var pi in Game.prototype) {
      cl.prototype[pi] = Game.prototype[pi];
    }
  };
  
  $w.Game = Game;
}(this, KeyboardManager, MouseManager);