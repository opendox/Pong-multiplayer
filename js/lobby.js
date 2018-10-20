class Lobby extends Phaser.Scene
{
    constructor ()
    {
        super('lobby');
    }

    preload ()
    {
        //load User Interface
		this.load.spritesheet('button', 'assets/button.png',
		{frameWidth: 256, frameHeight: 64});
    }

    create ()
    {
		let fontstyle = {size: 32, style: 'bold', font: 'Arial', color: '#ff0000', bg: undefined}; 
		this.newRoomBtn = utils.add.button(this,200,100,'Create Room',fontstyle);
		this.joinRoomBtn = utils.add.button(this,600,100,'Join Room',fontstyle);
		
		this.newRoomBtn.first.on('pointerdown', () => 
		{
			setTimeout(() => {this.scene.start('pong')},100);
		});
		
    }
	update ()
    {
            
		//start game pong with: this.scene.start('pong');
    }
	
}