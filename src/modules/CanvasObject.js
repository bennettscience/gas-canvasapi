/**
 * The base class for all objects.
 * 
 * @param {Object} requester    Requester instance for API calls
 * @param {Object} attributes   Attributes returned by the Canvas API to build the object.
 */
export class CanvasObject {
  constructor(requester, attributes) {

    // Carry the requester though to make subsequent API calls
    this._requester = requester;
    if(typeof attributes !== 'object') {
      attributes = JSON.parse(attributes)
    } 

    // Assign properties using whatever was sent back from the Canvas API.
    for(var name in attributes) {
      Object.defineProperty(this, name, {
        value: attributes[name],
        configurable: false,
        enumerable: true
      })
    }
  }
}