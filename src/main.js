!function ($window, Game) {
  
  function DemoGame() {
    Game.apply(this, arguments);
  }
  
  Game.extendTo(DemoGame);

  var knight;
  var txGreenBall;
  var knightSpeed = 120;
  var knightFrameSpeed = 0;
  var objects = [];
  
  DemoGame.prototype.init = function() {
    Game.prototype.init.apply(this);
    
    knightFrameSpeed = knightSpeed / this.config('FPS');
    
    this.keyboard().enable();
    this.mouse().enable();
    
    var txKnight = new PIXI.Texture.fromImage("images/golden_knight.png");
    txGreenBall = new PIXI.Texture.fromImage("images/green_ball.png");
    
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
    
    if (this.mouse().isPressed(1)) {
      console.log("MOUSE PRESSED")
      // Create a projectile.
      this.createProjectile();
    }
    
    this.moveKnight(_movement);

    for (var i = 0; i < objects.length; i++) {
	  objects[i].position.x += 1 * Math.cos(objects[i].angle)
	  objects[i].position.y += 1 * Math.sin(objects[i].angle)
    }
    
    return true;
  }
  
  DemoGame.prototype.moveKnight = function(vec) {
    var _len = Math.sqrt( vec[0]*vec[0] + vec[1]*vec[1] );
    if (_len == 0) return;
    
    knight.position.x += (vec[0] / _len) * knightFrameSpeed;
    knight.position.y += (vec[1] / _len) * knightFrameSpeed;
    
  };
  
  DemoGame.prototype.createProjectile = function() {
    var projectile = new PIXI.Sprite(txGreenBall);
    projectile.anchor.set(0.5, 0.5);
    projectile.position.set(knight.position.x, knight.position.y);

    this.root().addChild(projectile);

    // Get velocity of projectile on the x and y axis.
    var speed = 1;
    var dest = new PIXI.Point(this.mouse().pressedPosition[0], this.mouse().pressedPosition[1]);
	
    var deltax = dest.x - knight.position.x
	var deltay = dest.y - knight.position.y
	var angle = Math.atan2(deltay, deltax)
	//angle = angle * 180 / Math.PI
	console.log(angle);
	projectile.angle = angle
	
    console.log(knight.position.x, knight.position.y);

    objects.push(projectile);

  };
  
  $window.DemoGame = DemoGame;
}(this, this.Game);