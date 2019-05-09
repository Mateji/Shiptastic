import 'phaser';

export class WelcomeScene extends Phaser.Scene {
    gameTitle: Phaser.GameObjects.Text;
    startGame: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'WelcomeScene'
        });
    }
    init(params): void {

    }
    preload(): void {
        // TODO
    }

    create(): void {
        this.gameTitle = this.add.text(0, 10, '', { font: '24px Arial Bold', fill: '#ffffff' });
        this.gameTitle.text = 'Shiptastic';
        this.gameTitle.setX(this.cameras.main.centerX - (this.gameTitle.width / 2));

        this.startGame = this.add.text(0, 0, 'Play!', { font: '24px Arial Bold', fill: '#ffa500' });
        this.startGame.setX(this.cameras.main.centerX - (this.startGame.width / 2));
        this.startGame.setY(this.cameras.main.centerY - (this.startGame.height / 2));

        this.startGame.setInteractive();
        
        this.startGame.on('pointerout', this.onOut, this);
        this.startGame.on('pointerdown', this.onClick, this);
        this.startGame.on('pointerover', this.onHover, this);
    }
    update(time: number): void {

    }

    private onClick(): void {
        this.scene.start('GameScene');
    }

    private onHover(): void {
        this.startGame.setStyle({ fill: '#ffff00' });
    }
    private onOut(): void {
        this.startGame.setStyle({ fill: '#ffa500' });
    }

}