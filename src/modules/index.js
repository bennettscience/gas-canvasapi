import {Canvas} from './Canvas.js';

const CanvasApiModules = {
  Canvas: function(url, key) {
    return new Canvas(url, key)
  }
}

function modules() {
  return CanvasApiModules;
}