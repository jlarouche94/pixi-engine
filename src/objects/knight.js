class Knight {
  constructor(container, kbm) { // Perhaps we could make some singleton management class so we dont have to pass these around.
    var texture = new PIXI.Texture.fromImage("images/wizard.png");
    this.sprite = new PIXI.Sprite(texture);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.set(50, 50);
    this.sprite.interative = true;

    this.speed = 120;
    this.frameSpeed = this.speed / 60; // FPS need to expose config to all classes.
    this.movement = [0, 0];

    this.kbm = kbm;

    this.container = container;
    this.container.addChild(this.sprite);

  }

  destructor() {
    this.container.removeChild(this.sprite);
  }

  update() {

    this.updateMovement();

    var _len = Math.sqrt( this.movement[0]*this.movement[0] + this.movement[1]*this.movement[1] );
    if (_len == 0) return;

    this.sprite.position.x += (this.movement[0] / _len) * this.frameSpeed;
    this.sprite.position.y += (this.movement[1] / _len) * this.frameSpeed;
  }

  updateMovement() {
    this.movement = [0, 0];
    if (this.kbm.isPressed(38)) {
      this.movement[1] = -2;
    } else if (this.kbm.isPressed(40)) {
      this.movement[1] = 2;
    }

    if (this.kbm.isPressed(37)) {
      this.movement[0] = -2;
    } else if (this.kbm.isPressed(39)) {
      this.movement[0] = 2;
    }
  }
}
