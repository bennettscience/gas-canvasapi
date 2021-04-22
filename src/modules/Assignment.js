import {CanvasObject} from './CanvasObject.js'

export class Assignment extends CanvasObject {
  static classType = "Assignment"
  
  constructor(requester, attributes) {
    super(requester, attributes)
  }
}