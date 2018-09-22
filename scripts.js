// game circle bouncing obj
let gameObj;
// string varable called when game started
const game_name = 'Bouncing for Fun .....';

// global variable canvas width and height
const canvas_width = 600;
const canvas_height = 600;

// boolean variable set to false 
let game_started = false;

//color array
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


// start the game function
function startGame() {
    // console.log track when game starts
    console.log(game_name);

    // Make Component bouncing object
    gameObj = new Component(30, 30, 80, 75);
    // calls game start
    gameArea.start();

    // set to true when game started
    game_started = true;
    console.log('Game Status', game_started);
}

// stop game function
function stopGame() {

    // calls stop function
    gameArea.stop();

    //set to false when game stopped
    game_started = false;
    console.log('Game Status', game_started);
}

// gameArea variable config stuff
let gameArea = {
    // canvas init here
    canvas : document.createElement("canvas"),

    // start function
    start : function() {

        //set canvas width and height
        this.canvas.width = canvas_width;
        this.canvas.height = canvas_height;

        // set canvas to 2d
        this.context = this.canvas.getContext("2d");
        // appends canvas to the body
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
    },
    // stop function
    stop : function() {
        clearInterval(this.interval);
    },

    // clear function
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

// component obj
function Component(width, height, x, y) {
    //set obj width and height
    this.width = width;
    this.height = height;
    // x, y position of bounce obj
    this.x = x;
    this.y = y;
    // set speed in X and Y direction
    this.speedX = 0.5;
    this.speedY = 0;

    // set Gravity and Gravity speed
    this.gravity = 0.1;
    this.gravitySpeed = 8;
    //set bounce power
    this.bounce = 0.8;

    // update function
    this.update = function() {
        ctx = gameArea.context;
        // makes circle obj
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI*2);

        // Randomly get a color from color array
        let random_selected_color = colorArray[Math.floor(Math.random()*colorArray.length)];
        
        // if bounce obj hits the bottom the color will be changed here
        if(gameArea.canvas.height - this.height ===  this.y) {

            // loop through the color array 
            // just to show I am able to use forEach function
            colorArray.forEach(function (color) {
                if (color === random_selected_color) {
                    console.log('My Random Color is: ', color);
                    ctx.fillStyle = random_selected_color;
                }
            });
        }
        // fill by selected color 
        ctx.fill();

        // close path
        ctx.closePath();
    };

    // new postion function
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

    // hit bottom behavior function
    this.hitBottom = function() {
        const rockBottom = gameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    };

}

// updateGameArea
function updateGameArea() {
    gameArea.clear();
    gameObj.newPos();
    gameObj.update();
}
