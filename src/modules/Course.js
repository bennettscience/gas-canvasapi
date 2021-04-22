import {Assignment} from './Assignment.js'
import {CanvasObject} from './CanvasObject.js'
import {PaginatedList} from './PaginatedList.js';

export class Course extends CanvasObject {
  static classType() { return "Course" }
  
  constructor(requester, attributes) {
    super(requester, attributes)
  }

    /**
   * List all of the assignments in this course.
   * @calls `GET /api/v1/courses/:course_id/assignments \
   * <https://canvas.instructure.com/doc/api/assignments.html#method.assignments_api.index>`_
   *
   * @returns PaginatedList of Assignment
   */
  getAssignments() {
    return new PaginatedList(Assignment, this._requester, `GET`,`courses/${this.id}/assignments`)
  }

  /**
   * Return a single section from a course
   * 
   * @calls `GET /api/v1/courses/:course_id/sections/:section_id
   * @params {Int} id   The section ID to retrieve
   * @returns Section
   */
  getSection(id) {

  }

  /**
   * List all sections in a course.
   * @calls `GET /api/v1/courses/:course_id/secetions \ <https://canvas.instructure.com/doc/api/sections.html`
   * 
   * @returns PaginatedList of Section
   */
  getSections() {
    return new PaginatedList(Section, this._requester,`GET`, `courses/${this.id}/sections`)
  }
}