let windowWidth = 1000;
let windowHeight = 600;

let config = {
	type: Phaser.AUTO,
	width: windowWidth,
	height: windowHeight,
	pixelArt: true,
	physics:
    {
		default: 'arcade',
		arcade:
        {
            fps: 60,
            gravity: { y: 0 }
        }
	},
	scene:
    {
		preload: preload,
		create: create,
		update: update
	}
};

let playerLeft, playerRight;

let playerSpeed = 50;
let playerYDrag = 200;

let game = new Phaser.Game(config);
let ball, scoreTextLeft, scoreTextRight;
let scoreLeft = 0;
let scoreRight = 0;

let rightBound, leftBound;

let ballPos = new Phaser.Math.Vector2(windowWidth / 2, windowHeight / 2);
let ballVel = new Phaser.Math.Vector2(-300, 5);

// Distance the players are from the edge
let playerMargin = 100;

// Paddle dimensions
let playerWidth = 20;
let playerHeight = 100;

// Spawn Positions
let playerLeftPos = new Phaser.Math.Vector2
(
	playerMargin,
	windowHeight / 2 - (playerHeight / 2)
);
let playerRightPos = new Phaser.Math.Vector2
(
	windowWidth - (playerWidth + playerMargin),
	windowHeight / 2 - (playerHeight / 2)
);

function preload()
{
	this.load.image('ball', 'assets/ball.png');
	this.load.image('paddle', 'assets/paddle.png');
}

function create()
{
    //Controls
    cursors = this.input.keyboard.createCursorKeys();

    //Display Score
    scoreTextRight = this.add.text(game.canvas.width-55, 17, ''
			+ scoreRight, { fontSize: '64px', fill: '#ff0044' });

		scoreTextLeft = this.add.text(17, 17, ''
		 	+ scoreLeft, { fontSize: '64px', fill: '#ff0044' });

   	//Create ball
		ball = this.physics.add.sprite(512,512,'ball');
  	ball.body.collideWorldBounds=true;
		ball.setPosition(ballPos.x, ballPos.y);
    ball.setVelocity(ballVel.x, ballPos.y);
		ball.body.bounce.setTo(1, 1);

		//Player left
		playerLeft = this.physics.add.sprite(32,96,'paddle');
		playerLeft.enableBody = true;
    playerLeft.body.collideWorldBounds = true;
		playerLeft.body.immovable = true;

		playerLeft.body.drag.y = playerYDrag;
		playerLeft.setPosition(playerLeftPos.x, playerLeftPos.y);
		playerLeft.setDisplaySize(playerWidth, playerHeight);

		// layer right
		playerRight = this.physics.add.sprite(32,96,'paddle');
		playerRight.enableBody = true;
		playerRight.body.collideWorldBounds=true;
		playerRight.body.immovable = true;

		playerRight.body.drag.y = playerYDrag;
		playerRight.setPosition(playerRightPos.x, playerRightPos.y);
		playerRight.setDisplaySize(playerWidth, playerHeight);

		this.physics.add.collider(playerLeft, ball);
		this.physics.add.collider(playerRight, ball);
        
        leftBound = 5;
        rightBound = windowWidth - ball.width - 5;
}

function update ()
{
  	scoreUpdate();
		playerInput();
}




function scoreUpdate()
{
	if (ball.body.x < leftBound)
	{
			scoreRight++;
			scoreTextRight.setText('' + scoreRight);
			ball.setPosition(ballPos.x, ballPos.y);
	}
	else if (ball.body.x > rightBound)
	{
			scoreLeft++;
			scoreTextLeft.setText('' + scoreLeft);
			ball.setPosition(ballPos.x, ballPos.y);
	}
}

function playerInput()
{
	if (cursors.up.isDown)
	{
			playerLeft.body.setVelocity(0, playerLeft.body.velocity.y + -1 * playerSpeed);
	}
	if (cursors.down.isDown)
	{
			playerLeft.body.setVelocity(0, playerLeft.body.velocity.y + 1 * playerSpeed);
	}
}
