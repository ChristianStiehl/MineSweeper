class HUD extends PIXI.Container {
  constructor() {
    super();

    this.buildSmiley();
    // this.buildTimer();
  }

  buildSmiley() {
    this.smiley = new PIXI.Sprite(smileyTextures[0]);
    this.smiley .anchor.set(0.5);
    this.addChild(this.smiley);

    this.smiley.interactive = true;
    this.smiley.on('pointertap', this.resetGame, this);
  }

  updateSmiley(emotion) {
    this.smiley.texture = smileyTextures[emotion];
  }

  resetGame() {
    this.smiley.texture = smileyTextures[0];

    scene.grid.resetGame();
  }

  onRotate() {
    const { grid } = scene;

    this.smiley.x = grid.x;
    this.smiley.y = grid.y - (268 * grid.scale.y);

    if (grid.scale.x - 0.25 < 1) {
      this.smiley.scale.set(grid.scale.x - 0.25);
    } else {
      this.smiley.scale.set(1);
    }
  }
}
