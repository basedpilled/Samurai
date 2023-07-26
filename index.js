const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
let state = 'idle';
let state2 = 'idle'
c.fillRect(0,0,canvas.width,canvas.height);
const gravity = .7;
const background = new Sprite({
    position: {
        x: 0,
        y:0
    }
,imageSrc: './img/background.png'})

const shop = new Sprite({
    position: {
        x: 600,
        y:128
    }
,imageSrc: './img/shop.png', scale:2.75,framesMax:6})
const player = new Fighter({ 
    position: {
        x: 0, y:0 
    }, 
    velocity:{
    x: 0,
    y:0
}},{
    x: 200,
    y:220
}, './img/samuraiMack/idle.png',3,8,{
    idle:{
        imagesSrc: './img/samuraiMack/Idle.png',
        framesMax:8
    },
    Run: {
        imagesSrc: './img/samuraiMack/Run.png',
        framesMax:8
    },
    Jump: {
        imagesSrc: './img/samuraiMack/Jump.png',
        framesMax:2
    },
    Fall: {
        imagesSrc: './img/samuraiMack/fall.png',
        framesMax:2
    },
    Attack: {
        imagesSrc:'./img/samuraiMack/Attack1.png',
        framesMax:6
    },
    Hit: {
        imagesSrc:'./img/samuraiMack/TakeHit.png',
        framesMax: 4
    }

});

player.draw();

const enemy = new Fighter({ position: {x: 400, y:100 }, velocity:{
    x: 0,
    y:0
}},{
    x: 0,
    y:220
}, './img/kenji/idle.png',3,4,
{
        idle:{
            imagesSrc: './img/kenji/Idle.png',
            framesMax:4
        },
        Run: {
            imagesSrc: './img/kenji/Run.png',
            framesMax:8
        },
        Jump: {
            imagesSrc: './img/kenji/Jump.png',
            framesMax:2
        },
        Fall: {
            imagesSrc: './img/kenji/fall.png',
            framesMax:2
        },
        Attack: {
            imagesSrc:'./img/kenji/Attack1.png',
            framesMax:4
        },
        Hit: {
            imagesSrc:'./img/kenji/TakeHit.png',
            framesMax: 3
        }
});

enemy.draw();

const keys = {
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer();
function Animate() {
    window.requestAnimationFrame(Animate);
    c.fillStyle = 'black';
    c.fillRect(0,0,canvas.width,canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();
    player.velocity.x  = 0;
    enemy.velocity.x = 0;
    //player movement
    if (keys.a.pressed && player.lastKey === 'a' && !enemy.isAttacking) {
        player.velocity.x = -5;
        player.switchSprite('run')
    }  else if (keys.d.pressed && player.lastKey === 'd' && !enemy.isAttacking ) {
        player.switchSprite('run')
        player.velocity.x = 5;
    } else {
        player.switchSprite(state);
        
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity > 0) {
        player.switchSprite('fall')
    }
    // enemy movement


    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite(state2);
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity > 0) {
        enemy.switchSprite('fall')
    }





    if (rectangularCollision(player,enemy) && player.isAttacking ) {
        player.isAttacking = false;
        enemy.health -= 10;
        state2 = 'hit';
        setTimeout(()=> {
            state2 = 'idle';
        },1000)
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    } 
    if (rectangularCollision(enemy,player) && enemy.isAttacking ) {
        enemy.isAttacking = false;
        state = 'hit';
        setTimeout(()=> {
            state = 'idle';
        },1000)
        player.health -= 10;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    } 
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner(player,enemy,timerId);
    }
}

Animate();

window.addEventListener('keydown', (event) => {
    console.log(event.key)
   switch (event.key) {
    case 'd':
        keys.d.pressed = true;
        player.lastKey = 'd';
    break
    case 'a':
        keys.a.pressed = true;
        player.lastKey = 'a'; 
    break
    case 'w':
        player.velocity.y = -20;
    break

    case 'ArrowRight':
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
    break
    case 'ArrowLeft':
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
    break
    case 'ArrowUp':
        enemy.velocity.y = -20;
    break
    case ' ':
        player.attack(enemy);
    break;
    case 'ArrowDown':
        enemy.attack(player);
   }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
     case 'd':
        keys.d.pressed = false;
     break
     case 'a':
        keys.a.pressed = false;
    break
    }
    switch (event.key) {
        case 'ArrowRight':
           keys.ArrowRight.pressed = false;
        break
        case 'ArrowLeft':
           keys.ArrowLeft.pressed = false;
       break
    }
 })