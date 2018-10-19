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
    scene: [new Lobby(),new Pong()]
};

let game = new Phaser.Game(config);