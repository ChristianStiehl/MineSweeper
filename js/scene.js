// store canvas and create a new PIXI application
const canvas = document.getElementById('canvas');
const app = new PIXI.Application({ view: canvas });
const stage = app.stage;

// scene will be the 'grandparent' class
class Scene extends PIXI.Container {
  constructor() {
    super();

    this.buildScene();
    this.onRotate();
  }


  buildScene() {
    this.circle = new PIXI.Graphics();
    this.circle.beginFill(0x5cafe2);
    this.circle.drawCircle(0, 0, 80);
    this.circle.x = canvas.width / 2;
    this.circle.y = canvas.height / 2;
    this.addChild(this.circle);
  }

  onRotate() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    app.renderer.resize(canvas.width, canvas.height);

    this.circle.x = canvas.width / 2;
    this.circle.y = canvas.height / 2;
  }
}

// create a scene object
const scene = new Scene();
stage.addChild(scene);

// whenever the window resizes, lets make sure everything stays pretty.
window.addEventListener('resize', () => {
  scene.onRotate();
});