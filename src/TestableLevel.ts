import Level from './Level';

export default class TestableLevel extends Level {
  public testHandleDialogues(canvas: HTMLCanvasElement, dialogues: string[]): boolean {
    return this.handleDialogues(canvas, dialogues);
  }

  // Add a setter for keyListener
  public setMockKeyListener(mockKeyListener: any): void {
    this.keyListener = mockKeyListener;
  }

  public override nextLevel(): Level | null {
    return null; // Dummy implementation
  }

  public override spawnNextItem(): void {
    // Dummy implementation
  }
}
