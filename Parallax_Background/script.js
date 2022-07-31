const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 4;
// let gameFrame = 0;

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width) this.x = 0;
        this.x = this.x - this.speed;
        // this.x = gameFrame * this.speed % this.width;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

window.addEventListener('load', (e) => {
    const numberOfLayers = 5;
    const backgroundLayers = [];

    Array(numberOfLayers).fill().map((e, index) => {
        let background = new Image();
        background.src = `./assets/layer-${index + 1}.png`;
        backgroundLayers.push(new Layer(background, index + 1 == 5 ? 1 : 0.5))
    })

    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGamesSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', (e) => {
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    })

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        backgroundLayers.forEach(object => {
            object.update();
            object.draw();
        })
        // gameFrame--;
        requestAnimationFrame(animate);
    }

    animate();
});

