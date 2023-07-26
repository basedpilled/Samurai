class Sprite {
    constructor ({position, imageSrc,scale = 1, framesMax = 1, offset = {x:0,y:0}}) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.framesCurrent = 0;
        this.scale = scale;
        this.width = 50;
        this.height = 150;
        this.framesMax = framesMax;
        this.framesElapsed = 0;
        this.framesHold = 20;
        this.offset = offset;
    }
    draw() {
        c.drawImage(this.image,
            this.framesCurrent * (this.image.width / this.framesMax),0,this.image.width / this.framesMax,this.image.height,
            
            this.position.x - this.offset.x,this.position.y - this.offset.y,(this.image.width / this.framesMax) * this.scale,this.image.height*this.scale);
        }
    animateFrame() {
    this.draw();
      this.framesElapsed++;
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++;
          } else {
            this.framesCurrent = 0; 
          }
        }
    }
    
    update() {
      this.draw();
      this.framesElapsed++;
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++;
          } else {
            this.framesCurrent = 0; 
          }
        }
      }
     
}

class Fighter extends Sprite {
    constructor ({position,velocity},offset, imageSrc,scale = 1, framesMax = 1, sprites) {
        super({ position, imageSrc,scale, framesMax, offset})
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.health = 100;
        this.lastKey;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 20;
        this.isAttacking;
        this.sprites = sprites;
        for (const sprite in sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src =  sprites[sprite].imagesSrc;
        }
        console.log(this.sprites); 
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
    }
    attack (enemy) {
        this.switchSprite('attack');
        this.isAttacking = true;
        if (this.position.x - enemy.position.x < 0) {
            this.attackBox.offset.x = 0;
        } else {
            this.attackBox.offset.x = 50;
        }
        setTimeout(()=> {
            this.isAttacking = false;
        },100);
    }
    update() {
      this.draw();
      this.animateFrame();
      this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
        this.velocity.y = 0;
        this.position.y = 330;
      } else this.velocity.y += gravity;
    }
    switchSprite(input) {
        if (this.image === this.sprites.Attack.image && this.framesCurrent < this.sprites.Attack.framesMax - 1) {
            return;
        }
        
            switch(input) {
                case 'idle':
                    if (this.image !== this.sprites.idle.image) {
                        this.image = this.sprites.idle.image
                        this.framesMax = this.sprites.idle.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
                case 'run':
                    if (this.image !== this.sprites.Run.image) {
                        this.image = this.sprites.Run.image;
                        this.framesMax = this.sprites.Run.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
                case 'jump':
                    if (this.image !== this.sprites.Jump.image) {
                        this.image = this.sprites.Jump.image;
                        this.framesMax = this.sprites.Jump.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
                case 'fall':
                    if (this.image !== this.sprites.Fall.image)   {
                        this.image = this.sprites.Fall.image;
                        this.framesCurrent = 0;
                    }      
                break;
                case 'attack':
                    if (this.image !== this.sprites.Attack.image)   {
                        this.image = this.sprites.Attack.image;
                        this.framesMax = this.sprites.Attack.framesMax;
                        this.framesCurrent = 0;
                    }      
                break;
                case 'hit':
                    if (this.image !== this.sprites.Hit.image) {
                        this.image = this.sprites.Hit.image;
                        this.framesMax = this.sprites.Hit.framesMax;
                        this.framesCurrent = 0;
                    }
                break;
        }
    
        
}
}
