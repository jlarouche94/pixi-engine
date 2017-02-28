var bump = new Bump(PIXI);

class DemoGame extends Game {
  constructor(_w, _h, _bgColor) {
    super(_w, _h, _bgColor);
    this.knight;
    this.txGreenBall;
    this.txGround;
    this.groundContainer;
  }

  init() {
    super.init();
    
    super.keyboard().enable();
    super.mouse().enable();
    
    this.txGreenBall = new PIXI.Texture.fromImage("images/green_ball.png");
    this.txGround = new PIXI.Texture.fromImage("images/ground-patch.png");

    this.knight = new Knight(super.root(), super.keyboard());
    super.objectmanager().add(this.knight);
    
    this.buildGroundPlatform();

    return true;
  }
  
  update() {
    super.update();
    
    if (super.mouse().isPressed(1)) {
      console.log("MOUSE PRESSED")
      // Create a projectile.
      this.createProjectile();
    }
    
    this.objectmanager().update();
    
    return true;
  }
  
  buildGroundPlatform() {
    var groundNum = window._config.resolution.width / 64 // Ground patch is 64 pixels.
    console.log(groundNum);
    this.groundContainer = new PIXI.particles.ParticleContainer(groundNum);
    let xPosition = 0;
    for (let i = 0; i <= groundNum; i++) {
      let sprite = new PIXI.Sprite(this.txGround);
      sprite.position.set(
        xPosition,
        window._config.resolution.height - 64);
      sprite.collidable = true;
      super.objectmanager().add(sprite);
      super.root().addChild(sprite);
      xPosition += 64;
    }
    
    console.log(this.groundContainer.children);
    
  }
  
  createProjectile() {
    var spell = new Spell(super.root(), this.knight.sprite.position, this.mouse().pressedPosition, this.txGreenBall);
    super.objectmanager().add(spell, 1);

	var spell = new Spell(super.root(), this.knight.sprite.position, this.mouse().pressedPosition, this.txGreenBall);
	super.objectmanager().add(spell, 1);
    spell = new Spell(super.root(), this.knight.sprite.position, this.mouse().pressedPosition, this.txGreenBall);
    super.objectmanager().add(spell, 1);
    spell = new Spell(super.root(), this.knight.sprite.position, this.mouse().pressedPosition, this.txGreenBall);
    super.objectmanager().add(spell, 1);
    spell = new Spell(super.root(), this.knight.sprite.position, this.mouse().pressedPosition, this.txGreenBall);
    super.objectmanager().add(spell, 1);
    };
  
}
