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
