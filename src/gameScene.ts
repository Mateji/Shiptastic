import 'phaser';
import { Game } from 'phaser';

export class GameScene extends Phaser.Scene {
    delta: number;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Input.Keyboard.CursorKeys;
    speedText: Phaser.GameObjects.Text;

    playerSpeed: number;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    init(params): void {
        this.delta = 1000;
    }

    preload(): void {
        this.load.image('laser', 'assets/laser.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('flame', 'assets/flame.png');
        this.load.image('asteroid', 'assets/asteroid.png');
    }

    create(): void {
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.player = this.physics.add.image(0, 0, 'rocket');
        this.player = this.physics.add.sprite(0, 0, 'player');

        this.player.setScale(0.3, 0.3);
        this.player.setX(this.cameras.main.centerX);
        this.player.setY(this.cameras.main.centerY);

        this.playerSpeed = 400;
    }

    update(time): void {
        // Rotate Player towards mouse cursor
        const rotationToMouse = Phaser.Math.Angle.Between(
            this.player.x, this.player.y,
            this.input.mousePointer.x, this.input.mousePointer.y);
        this.player.setRotation(rotationToMouse);

        if (this.cursors.up.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle, this.playerSpeed));
        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle, this.playerSpeed).negate());
        } else {
            this.player.body.velocity.setTo(0);
        }
    }


}