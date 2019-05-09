import 'phaser';
import { GameScene } from './gameScene';

const config: GameConfig = {
    title: 'Phaser Typescript Skeleton',
    width: 800,
    height: 600,
    parent: 'game',
    scene: [GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#ff0000'
};

export class TypescriptSkeletonGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    const game = new TypescriptSkeletonGame(config);
};
