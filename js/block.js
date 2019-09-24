class Block extends PIXI.Container {
  constructor(adjacentTiles, isBomb) {
    super();

    if (isBomb === 1) {
      this.isBomb = true;
    }

    this.tapped = false;
    this.hasFlag = false;
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

    this.on('pointerdown', this.pointerdown, this);
    this.on('pointerup', this.pointerup, this);
  }

  disableControls() {
    this.buttonMode = false;
    this.interactive = false;

    this.off('pointerdown', this.pointerdown, this);
    this.off('pointerup', this.pointerup, this);
  }

  pointerdown() {
    this.holdTime = 0;

    app.ticker.add(this.update, this);
  }

  update() {
    this.holdTime += app.ticker.elapsedMS;

    if (this.holdTime >= 1000) {
      this.updateFlag();
      app.ticker.remove(this.update, this);
    }
  }

  pointerup() {
    app.ticker.remove(this.update, this);

    this.tap();
  }

  updateFlag() {
    if (this.hasFlag) {
      this.sprite.texture = blockTexture;
      this.hasFlag = false;
    } else {
      this.sprite.texture = flagTexture;
      this.hasFlag = true;
    }
  }

  tap() {
    if (this.tapped || this.hasFlag) {
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
    if (this.tapped || this.hasFlag) {
      return;
    }

    this.sprite.texture = bombTexture;
    this.tapped = true;
    this.disableControls();
  }
}