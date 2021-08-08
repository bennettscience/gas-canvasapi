import {Assignment} from './Assignment.js'
import {CanvasObject} from './CanvasObject.js'
import {Module} from './Module.js';
import {MissingRequriedFieldError, NotImplementedError} from './Error.js'
import {PaginatedList} from './PaginatedList.js';
import {Section} from './Section.js'

export class Course extends CanvasObject {
  static classType() { return "Course" }
  
  constructor(requester, attributes) {
    super(requester, attributes)
  }

  /**
   * Create a new assignment
   * 
   * @param {Object} data: Assignment details
   * @implements `POST /api/v1/courses/:course_id/assignments`
   * 
   * @returns Assignment
   */
  createAssignment(data) {
    let response;
    if('name' in data) {
      response = this._requester.request(
        "POST",
        `courses/${this.id}/assignments`,
        '',
        data
      );
    } else {
      throw new MissingRequriedFieldError("JSON object must include 'name' key.")
    }

    return new Assignment(this._requester, response.json())
  }

  /**
   * List all of the assignments in this course.
   * @implements `GET /api/v1/courses/:course_id/assignments \
   * <https://canvas.instructure.com/doc/api/assignments.html#method.assignments_api.index>`
   *
   * @returns PaginatedList of Assignment
   */
  getAssignments() {
    return new PaginatedList(Assignment, this._requester, `GET`,`courses/${this.id}/assignments`)
  }

  /**
   * Return a single section from a course
   * 
   * @implements `GET /api/v1/courses/:course_id/sections/:section_id
   * @params {Int} id   The section ID to retrieve
   * @returns Section
   */
  getSection(id) {
    throw new NotImplementedError('Building a custom Requester to use this endpoing.')
  }

  /**
   * 
   * Get a list of modules in the course.
   * @implements `GET /api/v1/courses/:course_id/modules \ <https://canvas.instructure.com/doc/api/modules.html`
   * @returns PaginatdList[Module]
   */
  getModules() {
    return new PaginatedList(Module, this._requester, `GET`, `courses/${this.id}/modules`)
  }

  /**
   * List all sections in a course.
   * @implements `GET /api/v1/courses/:course_id/secetions \ <https://canvas.instructure.com/doc/api/sections.html`
   * 
   * @returns PaginatedList of Section
   */
  getSections() {
    return new PaginatedList(Section, this._requester,`GET`, `courses/${this.id}/sections`)
  }
}