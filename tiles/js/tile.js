'use strict';

function Tile(options = {}) {

  this.row = options['row'] || 0;
  this.column = options['column'] || 0;
  this.active = options['active'] || false;

  this.prepare();

}

Tile.prototype = {

  prepare: function() {},

  toggle: function() {
    this.active = this.active ? false : true;
  },

  update: function(column, row) {

    if (column == this.column && row == this.row) {
      this.toggle();
    }

    else if (column == this.column) {
      if (this.row == (row - 1) || this.row == (row + 1)) {
        this.toggle();
      }
    }

    else if (row == this.row) {
      if (this.column == (column - 1) || this.column == (column + 1)) {
        this.toggle();
      }
    }

  },

  draw: function() {

    stage.resetStage();

    // Position.
    stage.stage.translate(stage.tileSize * this.column, stage.tileSize * this.row);

    // Draw.
    stage.stage.beginPath(); 
    stage.stage.rect(0, 0, stage.tileSize, stage.tileSize);
    if (this.active === false) {
      stage.stage.fill();
    }
    stage.stage.stroke();
    stage.stage.closePath(); 

  },

}
