let config =
{
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
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

let game = new Phaser.Game(config);
let ball, scoreTextLeft, scoreTextRight;
let scoreLeft = 0;
let scoreRight = 0;

function preload()
{
	this.load.image('ball', 'assets/ball.png');
}

function create()
{
    ball = this.physics.add.sprite(512,512,'ball');
    ball.body.collideWorldBounds=true;
    ball.body.bounce.set(1);
    ball.setVelocity(100,10);
    
    scoreTextRight = this.add.text(game.canvas.width-55, 17, ''+scoreRight, { fontSize: '64px', fill: '#ff0044' });
    scoreTextLeft = this.add.text(17, 17, ''+scoreLeft, { fontSize: '64px', fill: '#ff0044' });
}

function update ()
{
    if (ball.body.x < 5)
    {
        scoreRight++;
        scoreTextRight.setText(''+scoreRight);
        ball.setPosition(512,512);
    }
    else if (ball.body.x > game.canvas.width-ball.width-5)
    {
        scoreLeft++;
        scoreTextLeft.setText(''+scoreLeft);
        ball.setPosition(512,512);
    }
}