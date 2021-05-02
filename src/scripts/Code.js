/**
 * Functions defined here, or any written in the parent directory
 * are put into the project as regular appscripts files (next to appsscript.json)
 */

// Import the class from Bundle.js
const {Canvas, Requester} = Import

// Export specific modules for use in the library.
const CanvasApiModules = {
  Canvas: function(url, key) {
    return new Canvas(url, key)
  },
  Requester: function(url, key) {
    return new Requester(url, key)
  }
}

function modules() {
  return CanvasApiModules;
}