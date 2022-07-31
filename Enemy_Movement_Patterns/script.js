/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemy = 50;
let gameFrame = 0;

enemiesImageSizes = [
    {
        name: 1,
        width: 293,
        height: 155 
    },
    {
        name: 2,
        width: 155,
        height: 155 
    },
    {
        name: 3,
        width: 218,
        height: 177 
    },
    {
        name: 4,
        width: 213,
        height: 213 
    }
];

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './assets/enemy1.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 2.5; 
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);

        // for wiggle and waves movement
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
        this.curve = Math.random() * 7;

        // For baf movement only
        this.newX = Math.random() * (canvas.width - this.width);
        this.nexY = Math.random() * (canvas.height - this.height);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }

    wiggleMovement() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
    }

    wavesMovement() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        this.resetPosition();
    }
    
    circularMovement() {
        // swap cos & sin, Math.pi / => number for different pattern
        this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 200) + (canvas.width / 2 - this.width / 2)
        this.y = canvas.height / 2 * Math.sin(this.angle * Math.PI / 200) + (canvas.height / 2 - this.height / 2)
        this.angle += this.angleSpeed;
        this.resetPosition();
    }

    bafMovement() {
        if(gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }

        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;

        this.angle += this.angleSpeed
    }

    resetPosition() {
        if(this.x + this.width < 0) this.x = canvas.width
    }

    update() {
        this.bafMovement();
        // animate Frames
        if(gameFrame % this.flapSpeed === 0) this.frame > 4 ? this.frame = 0 : this.frame++;
    }

    draw() {
        this.update();
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,  this.x, this.y, this.width, this.height);
    }
}

const enemies = [];

Array(numberOfEnemy).fill().map((e) => {
    enemies.push(new Enemy());
})

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies.forEach(enemy => enemy.draw())
    
    gameFrame++;
    requestAnimationFrame(animate)
}

animate();