import TestableLevel from './TestableLevel';

describe('handleDialogues', () => {
  let canvas: HTMLCanvasElement;
  let level: TestableLevel;

  // Mock getContext for the canvas
  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      drawImage: jest.fn(),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      fillText: jest.fn(),
    } as unknown as CanvasRenderingContext2D);
  });

  beforeEach(() => {
    canvas = document.createElement('canvas'); // Create a mock canvas
    level = new TestableLevel(canvas, 100, 0); // Create an instance of TestableLevel

    // Mock keyListener
    const mockKeyListener = {
      keyPressed: jest.fn().mockReturnValue(false), // Default behavior for keyPressed
    };
    level.setMockKeyListener(mockKeyListener); // Inject the mocked keyListener
  });

  it('should call handleDialogues without errors', () => {
    const dialogues = ['path/to/dialogue1.png'];

    expect(() => {
      level.testHandleDialogues(canvas, dialogues);
    }).not.toThrow(); // Ensure it doesn't throw any errors
  });
});
