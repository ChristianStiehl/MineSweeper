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

  enableControls() {
    this.interactive = true;

    this.on('pointerdown', this.initialTap, this);
    this.on('pointerup', this.release, this);
  }

  disableControls() {
    this.interactive = false;
    this.tapped = true;

    this.off('pointerdown', this.initialTap, this);
    this.off('pointerup', this.release, this);
  }

  initialTap(event) {
    this.holdTime = 0;

    if (event.data.originalEvent.button === 2) {
      this.updateFlag();
    } else {
      app.ticker.add(this.update, this); 
    }
  }

  update() {
    this.holdTime += app.ticker.elapsedMS;

    if (this.holdTime >= 500) {
      this.updateFlag();
      app.ticker.remove(this.update, this);
    }
  }

  release() {
    app.ticker.remove(this.update, this);

    this.tap();
  }

  tap() {
    if (this.tapped || this.hasFlag) {
      return;
    }

    if (this.isBomb) {
      this.sprite.texture = bombRedTexture;
      this.disableControls();

      this.parent.showBombs();
      return;
    }

    this.sprite.texture = tileTextures[this.adjacentBombs];
    this.disableControls();

    if (this.adjacentBombs === 0) {
      for (let i = 0; i < this.adjacentTiles.length; i += 1) {
        const block = this.parent.grid[this.adjacentTiles[i].row][this.adjacentTiles[i].column];
        if (!block.isBomb) {
          if(block.hasFlag) {
            block.updateFlag();
          }
          block.tap();
        }
      }
    }

    this.parent.checkWin();
  }
}
