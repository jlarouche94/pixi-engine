class Game {
  constructor(_w, _h, _bgColor) {
    this._w = _w || 640;
    this._h = _h || 480;
    this._bgColor = _bgColor || 0x00000000;
    
    this._config = {
      'resolution': { 'width': _w, 'height': _h },
      'backgroundColor': _bgColor,
      'FPS': 60
    };
    
    window._config = this._config;
    
    this.DEBUG = true;
    
    this.renderer = null;
    this._root = null;
    
    this.kbm = null;
    this.mm = null;
    this.objm = null;
    
    this._i_runloop = null;
  }

  buildRenderer(rendererTarget, rendererClass) {
    if (! rendererClass) rendererClass = PIXI.WebGLRenderer;
    if (! rendererTarget) rendererTarget = document.body;
    
    this.renderer = new rendererClass(this.config().resolution.width,
                                     this.config().resolution.height);
    this.renderer.backgroundColor = this.config('backgroundColor');
    
    rendererTarget.appendChild( this.renderer.view );
    this._root = new PIXI.Container();
  };
  
  init() {
    this.buildRenderer();
    
    this.kbm = new KeyboardManager(this, this.DEBUG);
    this.mm = new MouseManager(this, this.DEBUG);
    this.objm = new ObjectManager();
    
    return true;
  };
  
  draw() {
    this.renderer.render(this._root);
  };
  
  update() {
    if (this.kbm) this.kbm.update();
    if (this.mm) this.mm.update();
    if (this.objm) this.objm.update();
    
    return true;
  };
  
  config(e) {
    return e ? this._config[e] : this._config;
  };
  
  // Getters start
  root() {
    return this._root;
  };
  
  keyboard() {
    return this.kbm;
  };
  
  mouse() {
    return this.mm;
  };

  objectmanager() {
    return this.objm;
  };
  // Getters end.
  
  run() {
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
    
  terminate() {
    console.info('Run loop terminated request');
    clearInterval(this._i_runloop);
  }
}
