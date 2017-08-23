function Stage() {

  this.canvas = document.getElementById('canvas');
  this.stage = this.canvas.getContext('2d');

  this.width = 500;
  this.height = 500;
  this.tileSize = 100;

  this.screenWidth = window.innerWidth;
  this.screenCanvasRatio = this.width / this.screenWidth;

  this.tiles = [];
  this.controls = {};
  this.loop = {};

  //this.goal = '[true,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]';
  this.goal = '[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]';
}

Stage.prototype = {

  prepare: function() {

    // Instantiate Controls.
    this.controls = new Controls();
    this.controls.prepare();

    for (var row = 0; row < 5; row++) {
      for (var column = 0; column < 5; column++) {
        this.tiles.push(new Tile({
          row: row,
          column: column,
          active: false,
        }));
      }
    }

    // Instantiate Loop.
    this.loop = new Loop();

    // Start loop.
    requestAnimationFrame(this.loop.mainLoop);

  },

  resetStage: function() {

    this.stage.setTransform(1, 0, 0, 1, 0, 0);
    this.stage.globalAlpha = 1;
    this.stage.lineWidth = 1;
    this.stage.strokeStyle = "#cccccc";
    this.stage.fillStyle = "#cccccc";

  },

  getPattern: function() {

    var pattern = [];

    // Loop through tiles.
    this.tiles.forEach(function(tile){
      pattern.push(tile.active);
    });

    return pattern;

  },

  update: function() {

    var x = this.controls.pointX;
    var y = this.controls.pointY;

    if (x && y) {

      var column = Math.floor(x / this.tileSize);
      var row = Math.floor(y / this.tileSize);

      // Loop through tiles.
      this.tiles.forEach(function(tile){

        // Update circle.
        tile.update(column, row);

      });

      var currentPattern =  JSON.stringify(this.getPattern());

      if (this.goal == currentPattern) {
        console.log('WIN!');
      }

      this.controls.pointX = 0;
      this.controls.pointY = 0;

    }

  },

  draw: function() {

    // Reset transformations and styles
    this.resetStage();

    // Clear canvas.
    this.stage.clearRect(0, 0, this.width, this.height);

    // Loop through tiles.
    this.tiles.forEach(function(tile){

      // Draw circle.
      tile.draw();

    });

  },

}