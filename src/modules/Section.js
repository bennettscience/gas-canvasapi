import {CanvasObject} from './CanvasObject.js'
import {Enrollment} from './Enrollment.js';
import {PaginatedList} from './PaginatedList.js';
import {Submission} from './Submission.js';

/**
 * @name Section
 */
export class Section extends CanvasObject {
  static classType() { return "Section" }

  constructor(requester, attributes) {
    super(requester, attributes)
  }

  /**
   * List all of the enrollments for the current user.
   * @name getEnrollments
   * @calls `GET /api/v1/sections/:section_id/enrollments \
        <https://canvas.instructure.com/doc/api/enrollments.html#method.enrollments_api.index>`_
   * @returns PaginatedList of Enrollment
   */
  getEnrollments(params) {
    params = params || {};
    return new PaginatedList(Enrollment,this._requester,`GET`,`sections/${this.id}/enrollments`, params)
  }

  /** 
   * List submissions for multiple assignments for a user.
   * Get all existing submissions for a given set of students and assignments.
   * @calls `GET /api/v1/sections/:section_id/students/submissions \ <https://canvas.instructure.com/doc/api/submissions.html#method.submissions_api.for_students>`_
   * @returns PaginatedList of Submission
  */
  getMultipleSubmissions(params) {
    params = params || {}

    return new PaginatedList(Submission, this._requester, `GET`, `sections/${this.id}/students/submissions`, params)
  }

}