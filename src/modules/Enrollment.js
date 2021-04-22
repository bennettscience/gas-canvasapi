import {CanvasObject} from './CanvasObject.js'

export class Enrollment extends CanvasObject {
  static classType = "Enrollment"
  
  constructor(requester, attributes) {
    super(requester, attributes)
  }
}