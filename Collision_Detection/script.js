/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
let canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = './assets/boom.png';
        this.sound = new Audio('./assets/boom.wav');
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }

    update() {
        if(this.frame === 0) this.sound.play();
        this.timer++;
        if(this.timer % 10 === 0) {
            this.frame++;
        };
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height / 2, this.width, this.height)
        ctx.restore();
    }
}

window.addEventListener('click', function(e) {
    createAnimation(e);
})

function createAnimation(e) {
    explosions.push(new Explosion(e.x - canvasPosition.left, e.y - canvasPosition.top));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    explosions.forEach(explosion => {
        explosion.draw();
        explosion.update();
        if(explosion.frame > 5) {
            explosions.splice(explosion, 1);
        }
    })
    requestAnimationFrame(animate)
}

animate();