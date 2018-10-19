class Lobby extends Phaser.Scene
{
    constructor ()
    {
        super('lobby');
    }

    preload ()
    {
        //load User Interface
    }

    create ()
    {
        this.add.text(200, 17, 'AddLobbyHere', { fontSize: '64px', fill: '#ff0044' });
        setTimeout(() =>
        {
            this.scene.start('pong');
        }, 3000, this);
    }
}