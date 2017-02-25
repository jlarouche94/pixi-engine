class Spell {
  constructor(root, startX, startY, targetX, targetY, texture) {
    //need a texture manager
    this.renderObj = new PIXI.Sprite(texture);
    this.renderObj.anchor.set(0.5, 0.5);
    this.renderObj.position.set(startX, startY);

    root.addChild(this.renderObj);

    this.lifetime = 1000.0;
    this.speed = (Math.random() * (5.0 - 2.5) + 2.5);
    
    var deltax = targetX - startX;
    var deltay = targetY - startY;
    var angle = Math.atan2(deltay, deltax) + (Math.random() * 0.5 - 0.25);
    //vector based physics instead of angle based.
    this.vectorX = this.speed * Math.cos(angle);
    this.vectorY = this.speed * Math.sin(angle);

  }
    
  update(delta){
    this.lifetime -= delta;
    
    //simulate gravity
    this.vectorY += delta * 0.05;//gavity const
      
    this.renderObj.position.x += this.vectorX * delta;
    this.renderObj.position.y += this.vectorY * delta;

    //there is a better way to do this but we need a collision normal
    if (this.renderObj.position.x > 650){
      this.vectorX = this.vectorX * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.x = 650;
    }
    if(this.renderObj.position.x < 0){
      this.vectorX = this.vectorX * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.x = 0;
    }
    if (this.renderObj.position.y > 450){
      this.vectorY = this.vectorY * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.y = 450;
    }
    if(this.renderObj.position.y < 0){
      this.vectorY = this.vectorY * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.y = 0;
    }
  }
  
  //we need a memory manager type thing maybe?
  toDestroy(){
    if (lifetime < 0){
      return true;
    }
    return false;
  }
}