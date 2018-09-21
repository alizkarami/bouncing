let gameObj;
const game_name = 'Bouncing for Fun .....';
const canvas_width = 600;
const canvas_height = 600;
let game_started = false;


const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];



function startGame() {
    console.log(game_name);
    gameObj = new Component(30, 30, 80, 75);
    gameArea.start();
    game_started = true;
    console.log('Game Status', game_started);
}

function stopGame() {
    gameArea.stop();
    game_started = false;
    console.log('Game Status', game_started);
}

let gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvas_width;
        this.canvas.height = canvas_height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function Component(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0.5;
    this.speedY = 0;
    this.gravity = 0.1;
    this.gravitySpeed = 8;
    this.bounce = 0.8;
    this.update = function() {
        ctx = gameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI*2);

       let random_selected_color = colorArray[Math.floor(Math.random()*colorArray.length)];
        if(gameArea.canvas.height - this.height ===  this.y) {
            colorArray.forEach(function (color) {
                if (color === random_selected_color) {
                    console.log('My Random Color is: ', color);
                    ctx.fillStyle = random_selected_color;
                }
            });
        }
        ctx.fill();
        ctx.closePath();
    };
    this.newPos = function() {
        this.gravitySpeed += this.gravity;

        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;


        if (this.x >= (gameArea.canvas.width - this.width)) {
            console.log('stop');
            this.y = gameArea.canvas.height - this.height;
            gameArea.stop();
        }
        this.hitBottom();
    };
    this.hitBottom = function() {
        const rockBottom = gameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    };

}

function updateGameArea() {
    gameArea.clear();
    gameObj.newPos();
    gameObj.update();
}
