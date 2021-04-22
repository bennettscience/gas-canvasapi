import {CanvasObject} from './CanvasObject.js'

export class Assignment extends CanvasObject {
  static classType() { return "Assignment" }
  
  constructor(requester, attributes) {
    super(requester, attributes)
  }
}