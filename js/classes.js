class Sprite {
    constructor({ position,imagesrc,scale=1,framesMax=1,offset={x:0,y:0} }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image= new Image()
        this.image.src = imagesrc
        this.scale= scale
        this.framesMax = framesMax
        this.FramesCurrent=0
        this.framesElapsed=0
        this.framesHold=5
        this.offset=offset
    }
    draw() {
        c.drawImage(
            this.image,
            this.FramesCurrent*this.image.width/this.framesMax,
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.position.x-this.offset.x,
            this.position.y-this.offset.y,
            (this.image.width/this.framesMax) * this.scale,
            (this.image.height) * this.scale
            )
    }
    aniateFrames(){
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold===0){
            if(this.FramesCurrent<this.framesMax-1){this.FramesCurrent++}
            else{this.FramesCurrent=0}
    }

    }
    update() {
        this.draw()
        this.aniateFrames()
    }
}

class Fighter extends Sprite {
    constructor({ 
        position, 
        velocity, 
        color = 'blue', 
        imagesrc,
        scale=1,
        framesMax=1,
        offset = {x:0,y:0},
        sprites,
        attackBox={
            offset:{},
            width:undefined,
            height:undefined
        }

}) {
    super({ 
        position,
        imagesrc,
        scale,
        framesMax,
        offset

    })
        // this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastkey
        this.isAttacking
        this.color = color
        this.health = 100
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            }
            ,
            offset:attackBox.offset,
            width:attackBox.width,
            height:attackBox.height

        }
        this.FramesCurrent=0
        this.framesElapsed=0
        this.framesHold=5
        this.sprites=sprites
        this.dead=false

        for(const sprite in sprites){
            sprites[sprite].image=new Image()
            sprites[sprite].image.src=sprites[sprite].imagesrc
        }
console.log(this.sprites)
    }

    // draw() {
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //     //atack box
    //     // c.fillStyle='green'
    //     if (this.isAttacking) {
    //         c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    //     }
        
    // }
    update() {
        this.draw()
        
        if(!this.dead) this.aniateFrames()
        // attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        // draw attackBox
        // c.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height-96) {
            this.velocity.y = 0
            this.position.y = 330
        }
        else {
            this.velocity.y += gravity
        }
// console.log(this.velocity.y)

    }
    
    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true
        // setTimeout(() => {
        //     this.isAttacking = false
        // }, 1000)
    }
    takeHit(){
        this.health-=20
        if(this.health<=0){
            this.switchSprite('death')
        }
        else this.switchSprite('takeHit')

    }
switchSprite(sprite) {
    if (this.image===this.sprites.death.image){
        if(
        this.FramesCurrent ===  this.sprites.death.framesMax-1
        )this.dead=true     
        return}   

    // override when attacking
    if (
        this.image===this.sprites.attack1.image
        &&
        this.FramesCurrent<this.sprites.attack1.framesMax-1
        )return
// override for when getting hit
if (
    this.image===this.sprites.takeHit.image
    &&
    this.FramesCurrent<this.sprites.takeHit.framesMax-1)
    return


switch (sprite){
    case 'idle':
            if (this.image!==this.sprites.idle.image){
            this.image=this.sprites.idle.image
            this.framesMax=this.sprites.idle.framesMax
            this.FramesCurrent=0
        }
            break
    case 'run':
        if (this.image!==this.sprites.run.image){
            this.image=this.sprites.run.image
            this.framesMax=this.sprites.run.framesMax
            this.FramesCurrent=0
        }
        
            break
    case 'jump':
        if (this.image!==this.sprites.jump.image){
            this.image=this.sprites.jump.image
            this.framesMax=this.sprites.jump.framesMax
            this.FramesCurrent=0
        }
         break

    case 'fall':
        if (this.image!==this.sprites.fall.image){
                this.image=this.sprites.fall.image
                this.framesMax=this.sprites.fall.framesMax
                this.FramesCurrent=0
            }
            break
    case 'attack1':
                if (this.image!==this.sprites.attack1.image){
                        this.image=this.sprites.attack1.image
                        this.framesMax=this.sprites.attack1.framesMax
                        this.FramesCurrent=0
                    }
                    break
    case 'takeHit':
        if (this.image!==this.sprites.takeHit.image){
                this.image=this.sprites.takeHit.image
                this.framesMax=this.sprites.takeHit.framesMax
                this.FramesCurrent=0
            }
            break

    case 'death':
        if (this.image!==this.sprites.death.image){
                this.image=this.sprites.death.image
                this.framesMax=this.sprites.death.framesMax
                this.FramesCurrent=0
            }
            break

                    
    }
}


}