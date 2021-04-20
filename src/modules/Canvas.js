import {Course} from './Course.js'
import {objOrId_} from './Utils.js';
import {PaginatedList} from './PaginatedList.js';
import {Requester} from './Requester.js'
import {Section} from './Section.js'

export class Canvas {
  constructor(baseUrl, accessToken, {Mock_=null}={}) {
    const apiSuffix = "api/v1";
    const secureOnly = "https://";
    const urlSyntax = "://";

    if(!baseUrl) {
      throw new Error('You must provide a valid URL.');
    }

    if(!accessToken) {
      throw new Error('You must provide an access token.');
    }

    if(baseUrl.includes(apiSuffix)) {
      throw new Error(`Do not include '/api/v1 in your URL.`);
    }

    if(!baseUrl.includes(secureOnly)) {
      throw new Error('https:// secure protocol required in the url.');
    }

    if(!baseUrl.includes(urlSyntax)) {
      throw new Error('A malformed URL protocol was used.');
    }

    this._baseUrl = baseUrl;
    this._accessToken = accessToken;
    this._requester = new Requester(baseUrl, accessToken)
  }

  /**
   * Gets a single course from the Canvas API by ID
   * 
   * @param {int}       course    Course ID to request
   * @param {bool}      useSisId  Set to true to pass an SIS ID instead
   * @param {object}    params    Extra query parameters to pass
   * 
   * @returns {object}  response  A parsed JSON object
   */
  getCourse(course, useSisId=false, params={}) {
    let courseId, uriStr;
    if(useSisId) {
      courseId = course;
      uriStr = `courses/sis_course_id:${courseId}`;
    } else {
      courseId = objOrId_(course, "course", [Course,])
      uriStr = `courses/${courseId}`
    }

    let response = this._requester.request("get", uriStr).json()
    return new Course(this._requester, response)
  }

  /**
   * Return a single section from a course
   * 
   * @calls `GET /api/v1/sections/:section_id
   * 
   * @params {int} section   The section ID to retrieve
   * @returns Section
   */
  getSection(section) {
    let sectionId, uriStr;

    sectionId = objOrId_(section, "section", [Section,])
    uriStr = `sections/${sectionId}`

    let response = this._requester.request("get", uriStr).json()
    return new Section(this._requester, response);
  }

  getCourses() {
    return new PaginatedList(Course, this._requester, "GET", "courses")
  }
}