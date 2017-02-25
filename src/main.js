class DemoGame extends Game {
  constructor(_w, _h, _bgColor) {
    super(_w, _h, _bgColor);
    this.knight;
    this.txGreenBall;
    this.knightSpeed = 120;
    this.knightFrameSpeed = 0;
    this.objects = [];
  }

  init() {
    super.init();
    this.knightFrameSpeed = this.knightSpeed / this.config('FPS');
    
    super.keyboard().enable();
    super.mouse().enable();
    
    var txKnight = new PIXI.Texture.fromImage("images/golden_knight.png");
    this.txGreenBall = new PIXI.Texture.fromImage("images/green_ball.png");
    
    this.knight = new PIXI.Sprite(txKnight);
    this.knight.anchor.set(0.5, 0.5);
    this.knight.position.set(50, 50);
    
    super.root().addChild(this.knight);
    
    return true;
  }

  update() {
    super.update();

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
    
    if (super.mouse().isPressed(1)) {
      console.log("MOUSE PRESSED")
      // Create a projectile.
      this.createProjectile();
    }
    
    this.moveKnight(_movement);

    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(1); // delta is 1 for now...testing
    }
    
    return true;
  }

  moveKnight(vec) {
    var _len = Math.sqrt( vec[0]*vec[0] + vec[1]*vec[1] );
    if (_len == 0) return;
    
    this.knight.position.x += (vec[0] / _len) * this.knightFrameSpeed;
    this.knight.position.y += (vec[1] / _len) * this.knightFrameSpeed;
    
  };
  
  createProjectile() {
	  
	var spell = new Spell(super.root(), this.knight.position.x , this.knight.position.y, 
						super.mouse().pressedPosition[0], super.mouse().pressedPosition[1], this.txGreenBall)
	this.objects.push(spell);
  spell = new Spell(super.root(), this.knight.position.x , this.knight.position.y, 
            super.mouse().pressedPosition[0], super.mouse().pressedPosition[1], this.txGreenBall)
  this.objects.push(spell);
  spell = new Spell(super.root(), this.knight.position.x , this.knight.position.y, 
            super.mouse().pressedPosition[0], super.mouse().pressedPosition[1], this.txGreenBall)
  this.objects.push(spell);
  spell = new Spell(super.root(), this.knight.position.x , this.knight.position.y, 
            super.mouse().pressedPosition[0], super.mouse().pressedPosition[1], this.txGreenBall)
  this.objects.push(spell);
  };
  
}
