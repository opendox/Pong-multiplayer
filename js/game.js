let config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

let game = new Phaser.Game(config);

function preload() {
	this.load.image('ball', 'assets/ball.png');
}

function create() {
    ball = this.physics.add.sprite(512,512,'ball');
    ball.body.collideWorldBounds=true;
    ball.setVelocity(1,1);
}

function update ()
{

}