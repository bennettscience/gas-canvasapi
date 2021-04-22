import {CanvasObject} from './CanvasObject.js'

export class Submission extends CanvasObject {
  static classType = "Submission";
  
  constructor(requester, attributes) {
    super(requester, attributes)
  }
}