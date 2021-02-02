const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
c.fillRect(0, 0, canvas.width, canvas.height)
// fillrect(x,y,width,height)
const gravity = 0.4
let jump = -10
let hor = 7
const background = new Sprite({
    position:{x:0,y:0},
    imagesrc:'./img/background.png'
})
const shop = new Sprite({
    position:{x:600,y:128},
    imagesrc:'./img/shop.png',
    scale:2.75
    ,framesMax:6
})

const player = new Fighter({
    position: {
        x: 100,
        y: 10
    },
    velocity:
        { x: 0, y: 0 }
    ,
    offset:
        { x: 0, y: 0 }
        ,
        imagesrc:'./img/samuraiMack/Idle.png',
        scale:2.75
        ,framesMax:8,
        offset:
        { x: 215, y: 180 },
        sprites:{
            idle:{
                imagesrc:'./img/samuraiMack/Idle.png',

                framesMax:8,  
            },
            run:{
                imagesrc:'./img/samuraiMack/Run.png',
                framesMax:8,  
            },
            jump:{
                imagesrc:'./img/samuraiMack/Jump.png',
                framesMax:2,  
            },
    
            fall:{
                imagesrc:'./img/samuraiMack/Fall.png',
                framesMax:2,  
            },
            attack1:{
                imagesrc:'./img/samuraiMack/Attack1.png',
                framesMax:6,  
            },
            takeHit:{
                imagesrc:'./img/samuraiMack/Take hit - white silhouette.png',
                framesMax:4,  
            },
            death:{
                imagesrc:'./img/samuraiMack/Death.png',
                framesMax:6,  
            }
        },
        attackBox:{
            offset:{x:100,y:50},
            width:160,
            height:50
        }

}
)
const enemy = new Fighter({
    position: {
        x: 700,
        y: 100
    },
    velocity:
        { x: 0, y: 0 }
    , color: 'red'
    , offset:
        { x: -50, y: 0 }
        ,
        imagesrc:'./img/kenji/Idle.png',
        scale:2.75
        ,framesMax:4,
        offset:
        { x: 215, y: 190 },
        sprites:{
            idle:{
                imagesrc:'./img/kenji/Idle.png',

                framesMax:4,  
            },
            run:{
                imagesrc:'./img/kenji/Run.png',
                framesMax:8,  
            },
            jump:{
                imagesrc:'./img/kenji/Jump.png',
                framesMax:2,  
            },
    
            fall:{
                imagesrc:'./img/kenji/Fall.png',
                framesMax:2,  
            },
            attack1:{
                imagesrc:'./img/kenji/Attack1.png',
                framesMax:4,  
            },
            takeHit:{
                imagesrc:'./img/kenji/Take hit.png',
                framesMax:3,  
            }
            ,
            death:{
                imagesrc:'./img/kenji/Death.png',
                framesMax:7,  
            }
        },
        attackBox:{
            offset:{x:-170,y:50},
            width:170,
            height:50
        }

})

// player.draw()
// enemy.draw()
// console.log(player)
// console.log(enemy)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

decreasetimer()

function animate() {
    window.requestAnimationFrame(animate)
    // console.log('animating')
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle= 'rgba(255,255,255,0.3)'  
    c.fillRect(0,0,canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
    //player movement
    // enemy.image=enemy.sprites.idle.image

    if (keys.a.pressed && player.lastkey === 'a') {
        player.velocity.x = -hor
        player.switchSprite('run')

    }
    else if (keys.d.pressed && player.lastkey === 'd') {
        player.velocity.x = hor
        player.switchSprite('run')

        
    }
    else{
    player.switchSprite('idle')

    }
    if(player.velocity.y<0){
        player.switchSprite('jump')
        }
else if(player.velocity.y>0){
    player.switchSprite('fall')

}

    // else if (keys.w.pressed && player.lastkey === 'w') {
    //     player.velocity.y = jump
       
    // }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -hor
        enemy.switchSprite('run')


    }
    else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = hor
        enemy.switchSprite('run')
    }
    // else if (keys.ArrowUp.pressed && enemy.lastkey === 'ArrowUp') {
    //     enemy.velocity.y = jump
    // }
    else{
        enemy.switchSprite('idle')
    
        }
        if(enemy.velocity.y<0){
            enemy.switchSprite('jump')
            }
    else if(enemy.velocity.y>0){
        enemy.switchSprite('fall')
    
    }


//detect colision
    if (
        rectanglecollision({ rec1: player, rec2: enemy }) &&
        player.isAttacking&&
        player.FramesCurrent===4

    ) {
        enemy.takeHit()
        // enemy.health-=20
        player.isAttacking = false
        console.log("playatack")
        document.querySelector('#enemyhealth').style.width = enemy.health +'%'
    }
// if player atack missses
if(player.isAttacking&&player.FramesCurrent===4){
    player.isAttacking = false
}

if (
        rectanglecollision({ rec1: enemy, rec2: player }) &&
        enemy.isAttacking&&
        enemy.FramesCurrent===2
    ) {
        player.takeHit()
        // player.health-=20
        enemy.isAttacking = false
        console.log("enemy atack")
        document.querySelector('#playerhealth').style.width = player.health + '%'

    }
// if enemy atack missses
if(enemy.isAttacking&&enemy.FramesCurrent===4){
    enemy.isAttacking = false
}
    //game over condition
if(enemy.health<=0 || player.health<=0 ){
    winner({player: player,enemy: enemy,timerid})
}

}

animate()

window.addEventListener('keydown', (event) => {
    // console.log(event.key)
if(!player.dead){
    switch (event.key) {

        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a'
            break
        case 'w':
            // || " "
            keys.w.pressed = true
            player.velocity.y = jump
            player.lastkey = 'w'
            break
        case ' ':
            player.attack()
            break
    }
}
if(!enemy.dead){
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft'
            break
        case 'ArrowUp':
            // || " "
            keys.ArrowUp.pressed = true
            enemy.velocity.y = jump
            enemy.lastkey = 'ArrowUp'
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            enemy.attack()

            break

    }
}

})
window.addEventListener('keyup', (event) => {
    // console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            player.velocity.y = 0
            break
        // case' ':
        //     keys.w.pressed = false
        //     player.velocity.y = 0
        //     break
    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            enemy.velocity.y = 0
            break
        case 'ArrowDown':
            enemy.isAttacking = false
            break

    }
})

 function PlaySound () {
var audio = new Audio('./Down.mp3');
audio.loop = false;
audio.play();
audio.controls=true;
} 
//PlaySound ()