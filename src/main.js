!function ($window, Game) {
  
  function DemoGame() {
    Game.apply(this, arguments);
  }
  
  Game.extendTo(DemoGame);

  var knight;
  var knightSpeed = 120;
  var knightFrameSpeed = 0;
  var gameObject = [];
  
  DemoGame.prototype.init = function() {
    Game.prototype.init.apply(this);
    
    knightFrameSpeed = knightSpeed / this.config('FPS');
    
    this.keyboard().enable();
    this.mouse().enable();
    
    var txKnight = new PIXI.Texture.fromImage("/images/golden_knight.png");
    
    knight = new PIXI.Sprite(txKnight);
    knight.anchor.set(0.5, 0.5);
    knight.position.set(50, 50);
    
    this.root().addChild(knight);
    
    return true;
  };
  
  DemoGame.prototype.update = function() {
    if (! Game.prototype.update.apply(this)) {
      return false;
    }
    
    var _movement = [0, 0];
    if (this.kbm.isPressed(38)) {
      _movement[1] = -1;
    } else if (this.kbm.isPressed(40)) {
      _movement[1] = 1;
    }
    
    if (this.kbm.isPressed(37)) {
      _movement[0] = -1;
    } else if (this.kbm.isPressed(39)) {
      _movement[0] = 1;
    }
    
    if (this.mm.wasPressed(1)) {
      // Create a projectile.
      this.createProjectile();
    }
    
    this.moveKnight(_movement);
    
    return true;
  }
  
  DemoGame.prototype.moveKnight = function(vec) {
    var _len = Math.sqrt( vec[0]*vec[0] + vec[1]*vec[1] );
    if (_len == 0) return;
    
    knight.position.x += (vec[0] / _len) * knightFrameSpeed;
    knight.position.y += (vec[1] / _len) * knightFrameSpeed;
    
  };
  
  DemoGame.prototype.createProjectile = function() {
    var projectile = new PIXI.Graphics();
    projectile.beginFill(0xe74ffff);
    projectile.drawCircle(knight.x, knight.y, 10);
    projectile.endFill();
    this.root().addChild(projectile);
  }
  
  $window.DemoGame = DemoGame;
}(this, this.Game);