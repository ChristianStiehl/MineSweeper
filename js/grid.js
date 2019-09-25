class Grid extends PIXI.Container {
  constructor() {
    super();

    // This 2D Array could be generated by the designer using a simple program.
    // The designer could set the desired width and height and place the bombs manually.
    // You can try it yourself by moving some of the 1s or adding new rows/columns.
    this.presetGrid = [
      [0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 1, 0, 0],
    ];

    this.buildGrid();
  }

  buildGrid() {
    this.grid = [];
    this.amountOfBombs = 0;

    for (let i = 0; i < this.presetGrid.length; i += 1) {
      const row = [];
      for (let j = 0; j < this.presetGrid[i].length; j += 1) {
        const isBomb = this.presetGrid[i][j] === 1;
        const tileInfo = this.getTileInfo(i, j);

        const block = new Block(tileInfo, isBomb);
        block.x = -(50 * ((this.presetGrid[i].length - 1) / 2)) + (j * 50);
        block.y = -(50 * ((this.presetGrid.length - 1) / 2)) + (i * 50);
        this.addChild(block);
        row.push(block);

        if (isBomb) {
          this.amountOfBombs += 1;
        }
      }
      this.grid.push(row);
    }
  }

  getTileInfo(row, column) {
    const adjacentTiles = [];
    let adjacentBombs = 0;

    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = column - 1; j <= column + 1; j += 1 ) {
        if (!(i === row && j === column)) {
          if (i >= 0 && i < this.presetGrid.length && j >= 0 && j < this.presetGrid[i].length) {
            adjacentTiles.push({ row: i, column: j });

            if (this.presetGrid[i][j] === 1) {
              adjacentBombs += 1;
            }
          }
        }
      }
    }

    return { tiles: adjacentTiles, bombs: adjacentBombs };
  }

  showBombs() {
    for (let i = 0; i < this.grid.length; i += 1) {
      for (let j = 0; j < this.grid[i].length; j += 1) {
        if (this.grid[i][j].isBomb) {
          this.grid[i][j].revealBomb();
        } else {
          this.grid[i][j].disableControls();
        }
      }
    }

    console.log('you lose!');
  }

  checkWin() {
    for (let i = 0; i < this.grid.length; i += 1) {
      for (let j = 0; j < this.grid[i].length; j += 1) {
        if (!this.grid[i][j].tapped && !this.grid[i][j].isBomb) {
          return false;
        }
      }
    }

    console.log('you win!');
  }

  onRotate() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;

    const widthRatio = (canvas.width - 50) / (this.grid[0].length * 50);
    const heightRatio = (canvas.height - 50) / (this.grid.length * 50);

    if (widthRatio <= heightRatio) {
      this.scale.set(widthRatio);
    } else {
      this.scale.set(heightRatio);
    }
  }
}
