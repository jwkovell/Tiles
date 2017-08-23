'use strict';

function Controls(options = {}) {

  this.pointX = 0;
  this.pointY = 0;

}

Controls.prototype = {

  // Prepare controls.
  prepare: function() {

    // Set mouse related handlers.
    this.setMouseHandlers();

  },

  // Set mouse handlers.
  setMouseHandlers: function() {

    // Reference controls.
    var controls = stage.controls;

    // On mouse click end...
    document.addEventListener('mouseup', function(event){

      // Indicate the end of an action.
      controls.pointX = event['clientX'] * stage.screenCanvasRatio;
      controls.pointY = event['clientY'] * stage.screenCanvasRatio;

    }, {passive: true});

  },

  draw: function() {},

}
