import 'phaser';
import { GameScene } from './gameScene';
import { WelcomeScene } from './welcomeScene';

const config: GameConfig = {
    title: 'Phaser Typescript Skeleton',
    width: 800,
    height: 600,
    parent: 'game',
    scene: [GameScene, WelcomeScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    backgroundColor: '#444'
};

export class TypescriptSkeletonGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const game = new TypescriptSkeletonGame(config);
};
