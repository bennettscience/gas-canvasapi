import {CanvasObject} from './CanvasObject.js'

export class Enrollment extends CanvasObject {
  static classType() { return "Enrollment" }

  constructor(requester, attributes) {
    super(requester, attributes)
  }
}