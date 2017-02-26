class DemoGame extends Game {
  constructor(_w, _h, _bgColor) {
    super(_w, _h, _bgColor);
    this.knight;
    this.txGreenBall;
  }

  init() {
    super.init();
    
    super.keyboard().enable();
    super.mouse().enable();
    
    this.txGreenBall = new PIXI.Texture.fromImage("images/green_ball.png");

    this.knight = new Knight(super.root(), super.keyboard());

    return true;
  }
  
  static config() {
    return super.config();
  }

  update() {
    super.update();
    
    if (super.mouse().isPressed(1)) {
      console.log("MOUSE PRESSED")
      // Create a projectile.
      this.createProjectile();
    }
    
    this.knight.update();
    this.objectmanager().update();
    
    return true;
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
