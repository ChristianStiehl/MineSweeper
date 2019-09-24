class Block extends PIXI.Container {
  constructor(adjacentTiles, isBomb) {
    super();

    if (isBomb === 1) {
      this.isBomb = true;
    }

    this.tapped = false;
    this.adjacentBombs = adjacentTiles.bombs;
    this.adjacentTiles = adjacentTiles.tiles;

    this.buildSprite();
    this.enableControls();
  }

  buildSprite() {
    this.sprite = new PIXI.Sprite(blockTexture);
    this.sprite .anchor.set(0.5);
    this.addChild(this.sprite);
  }

  enableControls() {
    this.buttonMode = true;
    this.interactive = true;

    this.on('pointertap', this.tap, this);
  }

  disableControls() {
    this.buttonMode = false;
    this.interactive = false;

    this.off('pointertap', this.tap);
  }

  tap() {
    if (this.tapped) {
      return;
    }

    if (this.isBomb) {
      this.sprite.texture = bombRedTexture;
      this.tapped = true;
      this.disableControls();

      this.parent.showBombs();
      return;
    }

    this.sprite.texture = tileTextures[this.adjacentBombs];
    this.tapped = true;
    this.disableControls();

    if (this.adjacentBombs === 0) {
      for (let i = 0; i < this.adjacentTiles.length; i += 1) {
        const block = this.parent.grid[this.adjacentTiles[i].x][this.adjacentTiles[i].y];
        if (!block.isBomb) {
          block.tap();
        }
      }
    }
  }

  revealBomb() {
    if (this.tapped) {
      return;
    }

    this.sprite.texture = bombTexture;
    this.tapped = true;
    this.disableControls();
  }
}