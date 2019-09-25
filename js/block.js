class Block extends PIXI.Container {
  constructor(tileInfo, isBomb) {
    super();

    this.tapped = false;
    this.hasFlag = false;
    this.adjacentBombs = tileInfo.bombs;
    this.adjacentTiles = tileInfo.tiles;
    this.isBomb = isBomb;

    this.buildSprite();
    this.enableControls();
  }

  buildSprite() {
    this.sprite = new PIXI.Sprite(blockTexture);
    this.sprite .anchor.set(0.5);
    this.addChild(this.sprite);
  }

  enableControls() {
    this.interactive = true;

    this.on('pointerdown', this.initialTap, this);
  }

  disableControls() {
    this.interactive = false;
    this.tapped = true;

    this.off('pointerdown', this.initialTap, this);
  }

  initialTap(event) {
    if (this.parent.gameEnded) {
      return;
    }

    const { button } = event.data.originalEvent;

    if (button === 2) {
      this.updateFlag();
    } else {
      this.on('pointerup', this.release, this);
      this.on('pointerupoutside', this.cancel, this);

      if (button === undefined) {
        this.holdTime = 0;
        app.ticker.add(this.update, this);
      }
    }
  }

  release() {
    if (this.parent.gameEnded) {
      return;
    }

    console.log('release');

    this.flipTile();
    this.cancel();
  }

  cancel() {
    this.off('pointerup', this.release, this);
    this.off('pointerupoutside', this.cancel, this);
    app.ticker.remove(this.update, this);
    this.holdTime = 0;
  }

  update() {
    this.holdTime += app.ticker.elapsedMS;

    if (this.holdTime >= 500) {
      this.updateFlag();
      this.cancel();
    }
  }


  flipTile() {
    if (this.tapped || this.hasFlag || this.parent.gameEnded) {
      return;
    }

    this.disableControls();

    if (this.isBomb) {
      this.sprite.texture = bombRedTexture;
      this.parent.showBombs();
      return;
    }

    this.sprite.texture = tileTextures[this.adjacentBombs];

    if (this.adjacentBombs === 0) {
      for (let i = 0; i < this.adjacentTiles.length; i += 1) {
        const block = this.parent.grid[this.adjacentTiles[i].row][this.adjacentTiles[i].column];
        if(block.hasFlag) {
          block.updateFlag();
        }
        block.flipTile();
      }
    }

    this.parent.checkWin();
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

  revealBomb() {
    if (this.tapped || this.hasFlag) {
      return;
    }

    this.sprite.texture = bombTexture;
    this.disableControls();
  }
}
