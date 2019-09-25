// load images
const blockTexture = PIXI.Texture.from('img/block.png');
const flagTexture = PIXI.Texture.from('img/flag.png');
const bombTexture = PIXI.Texture.from('img/bomb.png');
const bombRedTexture = PIXI.Texture.from('img/bombRed.png');

// store tiles in an array for easy retrieval later
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

// store the smileys the same way
const smileyTextures = [
  PIXI.Texture.from('img/smileyHappy.png'),
  PIXI.Texture.from('img/smileySurprised.png'),
  PIXI.Texture.from('img/smileyCool.png'),
  PIXI.Texture.from('img/smileyDead.png'),
];

// store canvas app and stage so we can access them later
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas });
const stage = app.stage;

// scene will handle all of the gameplay stuff
const scene = new Scene();
stage.addChild(scene);

scene.init();

// whenever the window resizes, lets make sure everything stays pretty
window.addEventListener('resize', () => {
  scene.onRotate();
});
