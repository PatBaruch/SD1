import Level from './Level.js';
import FEmail from './GameItem/FEmail.js';
import Level2 from './Level2.js';
import KeyListener from './KeyListener.js';
import Player from './Player.js';
export default class Level1 extends Level {
    spawnInterval = null;
    constructor(canvas, health, score) {
        super(canvas, health, score);
        document.body.className = 'level1';
        this.currentLevel = 1;
        this.currentDialogue = 0;
        this.player = new Player();
        this.keyListener = new KeyListener();
        this.hasStarted = false;
        this.maxX = 0.91 * this.canvas.width - this.player.getWidth() / 2;
        this.maxY = 0.86 * this.canvas.height - this.player.getHeight() / 2;
        this.minX = 0.05 * this.canvas.width;
        this.minY = 0.1 * this.canvas.height;
    }
    nextLevel() {
        if (this.player.getPosX() > 0.9 * this.canvas.width - this.player.getWidth() / 2
            && this.player.getPosY() < 0.59 * this.canvas.height - this.player.getHeight() / 2
            && this.player.getPosY() > 0.4 * this.canvas.height - this.player.getHeight() / 2
            && this.score >= 200 && this.gameItems.length === 0) {
            return new Level2(this.canvas, this.playerHealth, this.score);
        }
        return null;
    }
    render(canvas) {
        const dialogues = [
            '../assets/Dialogue-Level1/Level1-0.png',
            '../assets/Dialogue-Level1/Level1-1.png',
        ];
        if (this.handleDialogues(canvas, dialogues)) {
            super.render(canvas);
            if (!this.hasStarted) {
                this.startLevel();
                this.hasStarted = true;
            }
            if (this.score >= 200 && this.gameItems.length === 0) {
                document.body.className = 'goNextLevel';
            }
        }
    }
    spawnNextItem() {
        this.spawnInterval = setInterval(() => {
            if (this.score < 200) {
                this.gameItems.push(new FEmail(this.canvas, Math.random() * this.canvas.width * 0.9, Math.random() * this.canvas.height * 0.86));
            }
            if (this.score >= 200) {
                this.score = 200;
            }
        }, 500);
    }
}
//# sourceMappingURL=Level1.js.map