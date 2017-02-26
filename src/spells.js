class Spell {
  constructor(root, startPoint, targetPoint, texture) {
	//need a texture manager
	this.renderObj = new PIXI.Sprite(texture);
	this.renderObj.anchor.set(0.5, 0.5);
	this.renderObj.position.set(startPoint.x, startPoint.y);

    root.addChild(this.renderObj);

	this.lifetime = 1000.0;
	this.speed = (Math.random() * (5.0 - 2.5) + 2.5);
	
    var deltax = targetPoint.x - startPoint.x;
    var deltay = targetPoint.y - startPoint.y;
    var angle = Math.atan2(deltay, deltax) + (Math.random() * 0.5 - 0.25);
    //vector based physics instead of angle based.
    this.vectorX = this.speed * Math.cos(angle);
    this.vectorY = this.speed * Math.sin(angle);
  }
    
  update(delta){
	this.lifetime -= delta;
    
    if (this.lifetime < 300 && this.toDestroy() == false) {
      this.renderObj.alpha -= 0.0034; // Fade over 300 frames.
    }
    
	//simulate gravity
	this.vectorY += delta * 0.05;//gavity const
    
	this.renderObj.position.x += this.vectorX * delta;

    this.renderObj.position.y += this.vectorY * delta;

    //there is a better way to do this but we need a collision normal
    if (this.renderObj.position.x > window._config.resolution.width){
      this.vectorX = this.vectorX * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.x = window._config.resolution.width;
    }
    if(this.renderObj.position.x < 0){
      this.vectorX = this.vectorX * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.x = 0;
    }
    if (this.renderObj.position.y > window._config.resolution.height){
      this.vectorY = this.vectorY * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.y = window._config.resolution.height;
    }
    if(this.renderObj.position.y < 0){
      this.vectorY = this.vectorY * -1 * 0.7; // bounce but slow down a little
      this.renderObj.position.y = 0;
    }
  }
  
  destroy() {
    this.renderObj.destroy();
  }
  
  //we need a memory manager type thing maybe?
  toDestroy(){
    if (this.lifetime < 0){
      return true;
    }
    return false;
  }
}