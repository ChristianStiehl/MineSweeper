// store canvas and create a new PIXI application
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas });
const stage = app.stage;

// load images
const blockTexture = PIXI.Texture.from('img/block.png');
const flagTexture = PIXI.Texture.from('img/flag.png');
const bombTexture = PIXI.Texture.from('img/bomb.png');
const bombRedTexture = PIXI.Texture.from('img/bombRed.png');

// store tiles in array for easy retrieval later
const tileTextures = [
  PIXI.Texture.from('img/tile0.png'),
  PIXI.Texture.from('img/tile1.png'),
  PIXI.Texture.from('img/tile2.png'),
  PIXI.Texture.from('img/tile3.png'),
  PIXI.Texture.from('img/tile4.png'),
  PIXI.Texture.from('img/tile5.png'),
  PIXI.Texture.from('img/tile6.png'),
  PIXI.Texture.from('img/tile7.png'),
  PIXI.Texture.from('img/tile8.png'),
];

// scene will be the 'grandparent' class
class Scene extends PIXI.Container {
  constructor() {
    super();

    this.buildScene();
    this.onRotate();
  }


  buildScene() {
    this.buildGrid();
  }

  buildGrid() {
    this.grid = new Grid();
    this.addChild(this.grid);
  }

  onRotate() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    if (this.grid) {
      this.grid.x = canvas.width / 2;
      this.grid.y = canvas.height / 2;

      this.grid.scale.set(1);

      const widthRatio = (canvas.width - 50) / this.grid.width;
      const heightRatio = (canvas.height - 50) / this.grid.height;

      if (widthRatio <= heightRatio) {
        this.grid.scale.set(widthRatio);
      } else {
        this.grid.scale.set(heightRatio);
      }
    }
  }
}

// create a scene object
const scene = new Scene();
stage.addChild(scene);

// whenever the window resizes, lets make sure everything stays pretty.
window.addEventListener('resize', () => {
  scene.onRotate();
});