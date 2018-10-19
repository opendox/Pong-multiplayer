class Pong extends Phaser.Scene 
{
    constructor()
    {
        super('pong');
        this.playerLeft, this.playerRight;
        this.playerSpeed = 50;
        this.playerYDrag = 200;

        this.ball, this.scoreTextLeft, this.scoreTextRight;
        this.scoreLeft = 0;
        this.scoreRight = 0;

        this.ballPos = new Phaser.Math.Vector2(windowWidth / 2, windowHeight / 2);
        this.ballVel = new Phaser.Math.Vector2(-300, 5);

        // Distance the players are from the edge
        this.playerMargin = 100;

        // Paddle dimensions
        this.playerWidth = 20;
        this.playerHeight = 100;

        this.cursors;
    }

    preload()
    {
        // Spawn Positions
        this.playerLeftPos = new Phaser.Math.Vector2
        (
            this.playerMargin,
            windowHeight / 2 - (this.playerHeight / 2)
        );
        this.playerRightPos = new Phaser.Math.Vector2
        (
            windowWidth - (this.playerWidth + this.playerMargin),
            windowHeight / 2 - (this.playerHeight / 2)
        );
        this.load.image('ball', 'assets/ball.png');
        this.load.image('paddle', 'assets/paddle.png');
    }

    create()
    {
        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        //Display Score
        this.scoreTextRight = this.add.text(game.canvas.width - 55, 17, ''
        + this.scoreRight, { fontSize: '64px', fill: '#ff0044' });
        this.scoreTextLeft = this.add.text(17, 17, ''
        + this.scoreLeft, { fontSize: '64px', fill: '#ff0044' });
        

        this.createBall();
        this.createPlayers();

        this.leftBound = 5;
        this.rightBound = windowWidth - this.ball.width - 5;
    }
    
    createBall()
    { 
        //Create ball
        this.ball = this.physics.add.sprite(512,512,'ball');
        this.ball.body.collideWorldBounds=true;
        this.ball.setPosition(this.ballPos.x, this.ballPos.y);
        this.ball.setVelocity(this.ballVel.x, this.ballPos.y);
        this.ball.body.bounce.setTo(1, 1);
    }

    createPlayers()
    { 
        //Player left
        this.playerLeft = this.physics.add.sprite(32,96,'paddle');
        this.playerLeft.enableBody = true;
        this.playerLeft.body.collideWorldBounds = true;
        this.playerLeft.body.immovable = true;

        this.playerLeft.body.drag.y = this.playerYDrag;
        this.playerLeft.setPosition(this.playerLeftPos.x, this.playerLeftPos.y);
        this.playerLeft.setDisplaySize(this.playerWidth, this.playerHeight);

        // player right
        this.playerRight = this.physics.add.sprite(32,96,'paddle');
        this.playerRight.enableBody = true;
        this.playerRight.body.collideWorldBounds=true;
        this.playerRight.body.immovable = true;

        this.playerRight.body.drag.y = this.playerYDrag;
        this.playerRight.setPosition(this.playerRightPos.x, this.playerRightPos.y);
        this.playerRight.setDisplaySize(this.playerWidth, this.playerHeight);

        this.physics.add.collider(this.playerLeft, this.ball);
        this.physics.add.collider(this.playerRight, this.ball);
    }

    update()
    {
        this.scoreUpdate();
        this.playerInput();
    }
    
    scoreUpdate()
    {
        if (this.ball.body.x < 5)
        {
            this.scoreRight++;
            this.scoreTextRight.setText(''+this.scoreRight);
            this.ball.setPosition(512,512);
        }
        else if (this.ball.body.x > windowWidth-this.ball.width-5)
        {
            this.scoreLeft++;
            if (this.scoreLeft > 0) 
            {
                this.scene.start('lobby');
            }
            this.scoreTextLeft.setText(''+this.scoreLeft);
            this.ball.setPosition(500,300);
        }
    }
    
    playerInput()
    {
        if (this.cursors.up.isDown)
        {
            this.playerLeft.body.setVelocity(0, this.playerLeft.body.velocity.y + -1 * this.playerSpeed);
        }
        if (this.cursors.down.isDown)
        {
            this.playerLeft.body.setVelocity(0, this.playerLeft.body.velocity.y + 1 * this.playerSpeed);
        }
    }
}
