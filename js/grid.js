class Grid extends PIXI.Container {
  constructor() {
    super();

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

    this.grid = [];

    this.buildGrid();
  }

  buildGrid() {
    for (let i = 0; i < this.presetGrid.length; i += 1) {
      const row = [];
      for (let j = 0; j < this.presetGrid[i].length; j += 1) {
        const block = new Block(this.getAdjacentTiles(i, j), this.presetGrid[i][j]);
        block.x = -(50 * ((this.presetGrid[i].length - 1) / 2)) + (j * 50);
        block.y = -(50 * ((this.presetGrid.length - 1) / 2)) + (i * 50);
        this.addChild(block);
        row.push(block);
      }
      this.grid.push(row);
    }
  }

  getAdjacentTiles(row, column) {
    const adjacentTiles = [];
    let adjacentBombs = 0;

    for (let i = row - 1; i <= row + 1; i += 1) {
      for (let j = column - 1; j <= column + 1; j += 1 ) {
        if (i >= 0 && i < this.presetGrid.length && j >= 0 && j < this.presetGrid[i].length) {
          if (!(i === row && j === column)) {
            adjacentTiles.push({ x: i, y: j });
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
        }
      }
    }
  }
}