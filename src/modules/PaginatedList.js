import {parseLinkHeader_} from './Utils.js';

/** 
 * Abstract the Canvas paginatied results
 * https://canvas.instructure.com/doc/api/file.pagination.html
 * 
 * Sometimes Canvas returns an object key instead of an array directly. The
 * `root` param is used in these cases to access the array.
 * 
 * @param {object} itemClass       The class to return through the list
 * @param {Requester} requester    Active requester to make the API call
 * @param {string} requestMethod   HTTP method for the request
 * @param {string} firstUrl        Endpoint for the request
 * @param {object} [params=null]   Optional arguments for the request
 * @param {string} [root=null]
 * 
 */
export class PaginatedList {
  static classType() { return "PaginatedList"; }

  constructor(itemClass, requester, requestMethod, firstUrl, params) {
    this._elements = [],
    this._requester = requester;
    this._itemClass = itemClass;
    this._firstUrl = firstUrl;
    this._firstParams = params || {};
    this._firstParams["per_page"] = 100;
    this._nextUrl = firstUrl;
    this._nextParams = this._firstParams;
    this._requestMethod = requestMethod;
  }

  // This class is an iterable, so we need our own iterator.
  // https://www.javascripttutorial.net/es6/javascript-iterator/
  *[Symbol.iterator]() {
    for(let element in this._elements) {
      yield element
    }
    while(this.hasNext()) {
      let newElements = this.grow();
      for(let el of newElements) {
        yield el;
      }
    }
  }

  hasNext() {
    return this._nextUrl != null;
  }

  grow() {
    let newElements = this.getNextPage()
    this._elements += newElements;
    return newElements
  }

  getNextPage() {
    let data;
    let response = this._requester.request(this._requestMethod, this._nextUrl, null, this._firstParams, null)
    this._nextUrl = null

    let nextLink = parseLinkHeader_(response.headers()["Link"])
    
    if(nextLink["next"]) {
      this._nextUrl = nextLink["next"].replace(this._requester._baseUrl, "")
    } else {
      this._nextUrl = null;
    }

    this._nextParams = {}

    let content = []

    if(this._root) {
      try {
        data = data[self._root]
      } catch(e) {
        // what does this error mean?
        throw new Error("Invalid root value specified.")
      }
    }
    if(typeof response.json() !== 'object') {
      data = JSON.parse(response.json())
    } else {
      data = response.json();
    }
    for(let element of data) {
      if(element != null) {
        content.push(new this._itemClass(this._requester, element))
      }
    }

    return content
  }
}