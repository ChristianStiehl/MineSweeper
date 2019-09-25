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

const smileyTextures = [
  PIXI.Texture.from('img/smileyHappy.png'),
  PIXI.Texture.from('img/smileySurprised.png'),
  PIXI.Texture.from('img/smileyCool.png'),
  PIXI.Texture.from('img/smileyDead.png'),
];

// scene will be the 'grandparent' class
class Scene extends PIXI.Container {
  init() {
    this.buildScene();
    this.onRotate();
  }

  buildScene() {
    this.buildBackground();
    this.buildGrid();
    this.buildHud();
  }

  buildBackground() {
    this.background = new PIXI.Graphics();
    this.background.beginFill(0x606060);
    this.background.drawRect(0, 0, canvas.width, canvas.height);
    this.background.endFill();

    this.addChild(this.background);
  }

  buildGrid() {
    this.grid = new Grid();
    this.addChild(this.grid);
  }

  buildHud() {
    this.hud = new HUD();
    this.addChild(this.hud);
  }

  onRotate() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    if (this.background) {
      this.background.clear();
      this.background.beginFill(0x606060);
      this.background.drawRect(0, 0, canvas.width, canvas.height);
      this.background.endFill();
    }

    if (this.grid) {
      this.grid.onRotate();
    }

    if (this.hud) {
      this.hud.onRotate();
    }
  }
}

// create a scene object
const scene = new Scene();
stage.addChild(scene);

scene.init();

// whenever the window resizes, lets make sure everything stays pretty.
window.addEventListener('resize', () => {
  scene.onRotate();
});
