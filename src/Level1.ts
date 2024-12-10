import Level from './Level.js';
import FEmail from './GameItem/FEmail.js';
import Level2 from './Level2.js';
import KeyListener from './KeyListener.js';
import CanvasRenderer from './CanvasRenderer.js';
import Player from './Player.js';

export default class Level1 extends Level {
  private spawnInterval: number | null = null;

  public constructor(canvas: HTMLCanvasElement, health: number, score: number,) {
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

  /**
   *  @returns Level | null
   */
  public override nextLevel(): Level | null {
    if (this.player.getPosX() > 0.9 * this.canvas.width - this.player.getWidth() / 2
    && this.player.getPosY() < 0.59 * this.canvas.height - this.player.getHeight() / 2
    && this.player.getPosY() > 0.4 * this.canvas.height - this.player.getHeight() / 2
    && this.score >= 200 && this.gameItems.length === 0) {
      return new Level2(this.canvas, this.playerHealth, this.score);
    }
    return null;
  }

  /**
   * Renders the level2 on the canvas.
   * @param canvas - The HTML canvas element to render on.
   */
  public override render(canvas: HTMLCanvasElement): void {
    const dialogues: string[] = [
      '../assets/Dialogue-Level1/Level1-0.png',
      '../assets/Dialogue-Level1/Level1-1.png',
    ];

    if (this.handleDialogues(canvas, dialogues)) {
      // Only runs if dialogues are finished
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

  /**
   * Spawns the next game item.
   */
  public override spawnNextItem(): void {
    this.spawnInterval = setInterval(() => {
      if (this.score < 200) {
        this.gameItems.push(new FEmail(this.canvas,
          Math.random() * this.canvas.width * 0.9, Math.random() * this.canvas.height * 0.86));
      } if (this.score >= 200) {
        this.score = 200;
      }
    }, 500);
  }
}
