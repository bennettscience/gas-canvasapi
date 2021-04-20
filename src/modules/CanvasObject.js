export class CanvasObject {

  /**
   * The base class for all objects.
   * 
   * @param {Object} requester    Requester instance for API calls
   * @param {Object} attributes   Attributes returned by the Canvas API to build the object.
   */
  constructor(requester, attributes) {
    this._requester = requester;
    if(typeof attributes !== 'object') {
      attributes = JSON.parse(attributes)
    } 
    for(var name in attributes) {
      Object.defineProperty(this, name, {
        value: attributes[name],
        configurable: false,
        enumerable: true
      })
    }
  }

  repr() {
    console.log(this)
  }
}