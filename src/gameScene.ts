import 'phaser';
import { Game } from 'phaser';

export class GameScene extends Phaser.Scene {
    delta: number;
    player: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Input.Keyboard.CursorKeys;
    speedText: Phaser.GameObjects.Text;
    playerSpeed: number;
    sfx: Phaser.Sound.BaseSound;
    lastShot: number;
    bullets: Phaser.Physics.Arcade.Group;
    debugText: Phaser.GameObjects.Text;

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
        this.load.image('bullet', 'assets/bullet.png');
        this.load.audio('gun', 'assets/usp_unsil-1.wav');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            }
        );
    }

    create(): void {

        //this.player = this.physics.add.image(0, 0, 'rocket');
        this.player = this.physics.add.sprite(0, 0, 'player');
        this.sfx = this.sound.add('gun', { volume: 0.2 });

        this.player.setScale(0.3, 0.3);
        this.player.setX(this.cameras.main.centerX);
        this.player.setY(this.cameras.main.centerY);

        this.playerSpeed = 400;

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        this.debugText = this.add.text(0, 0, '', { font: '24px Arial Bold', fill: '#ffffff' });
    }

    update(time): void {
        var pointer = this.input.activePointer;
        var touchX = pointer.x;
        var touchY = pointer.y;
        this.debugText.setText('x: ' + touchX + ' y: ' + touchY);

        this.bullets.getChildren().forEach((bullet) => {
            var bulletBody = <Phaser.Physics.Arcade.Body>bullet.body;
            if (bulletBody.x > 1200 || bulletBody.x < 0 || bulletBody.y < 0 || bulletBody.y > 900) {
                bullet.destroy();
            }
        }, this);

        if (pointer.isDown) {
            if (this.lastShot === undefined || this.lastShot + 250 < time) {
                this.lastShot = time;
                console.log(time);
                this.sfx.play();
                
                const pX = this.player.x;
                const pY = this.player.y;
                const gX = pX + 40 * Math.cos(this.player.rotation);
                const gY = pY + 15 * Math.sin(this.player.rotation);
                console.log('player: ' + pX + ' ' + pY);
                console.log('rotation: ' + this.player.rotation);
                console.log('angle: ' + this.player.angle);
                console.log('bullet: ' + gX + ' ' + gY);
                var bullet = this.bullets.get(gX, gY);
                if (bullet) {
                    bullet.setActive(true);
                    bullet.setVisible(true);
                    bullet.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle, 1200));
                }
            }
        }

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

        if (this.cursors.left.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle - 90, this.playerSpeed));
        } else if (this.cursors.right.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle + 90, this.playerSpeed));
        }

        if (this.cursors.left.isDown && this.cursors.down.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle - 135, this.playerSpeed));
        } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle + 135, this.playerSpeed));
        }

        if (this.cursors.left.isDown && this.cursors.up.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle - 45, this.playerSpeed));
        } else if (this.cursors.right.isDown && this.cursors.up.isDown) {
            this.player.body.velocity.copy(this.physics.velocityFromAngle(this.player.angle + 45, this.playerSpeed));
        }
    }


}