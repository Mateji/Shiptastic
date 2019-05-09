import 'phaser';
import { Game } from 'phaser';

export class GameScene extends Phaser.Scene {
    delta: number;
    player: Phaser.Physics.Arcade.Image;
    cursors: Phaser.Input.Keyboard.CursorKeys;

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
        this.load.image('flame', 'assets/flame.png');
        this.load.image('asteroid', 'assets/asteroid.png');
    }

    create(): void {
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.player = this.physics.add.image(0, 0, 'rocket');
        this.player = this.physics.add.sprite(0, 0, 'rocket');

        this.player.setScale(0.3, 0.3);
        this.player.setX(this.cameras.main.centerX);
        this.player.setY(this.cameras.main.centerY);


        this.player.setDrag(300);
        this.player.setAngularDrag(400);
        this.player.setMaxVelocity(600);

        console.log(this.player);
    }

    update(time): void {
        if (this.cursors.left.isDown) {
            this.player.setAngularVelocity(-150);
        } else if (this.cursors.right.isDown) {
            this.player.setAngularVelocity(150);
        } else {
            this.player.setAngularVelocity(0);
        }

        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(this.player.rotation, 400, this.player.body.velocity);
        }
        else {
            this.player.setAcceleration(0);
        }
    }
}