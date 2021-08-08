import {NotImplementedError, IncompleteRequestError} from './Error.js';
import {serialize_} from './Utils.js';

/**
 * @typedef {Object} CanvasResponse
 * @property {String}   json        HTTP response content
 * @property {Int}      status      HTTP status code
 * @property {String}   headers     HTTP response headers
 * 
 * @typedef {Object} HTTPResponse
 * @name HTTPResponse
 * @description The base Google Apps Script HTTP response object. See https://developers.google.com/apps-script/reference/url-fetch/http-response
 */

// TODO: Check for optional args before making the request
// TODO: Create payload for requests

export class Requester {
  static classType() { return "Requester"; }

  constructor(baseUrl, accessToken, {UrlFetchApp_=UrlFetchApp}={}) {
    this._baseUrl = baseUrl + "/api/v1/";
    this._accessToken = accessToken;
    this.UrlFetchApp = UrlFetchApp_;
  }

  delete_request_(url, headers, data=null, payload={}) {
    const opts = {
      "method": "DELETE",
      "contentType": "application/json",
      "headers": headers
    }
  }

  /**
   * 
   * @param {String} url        Endpoint for the request
   * @param {Object} headers    Optional headers
   * @param {String} query      URL-safe query string
   * 
   * @returns {HTTPResponse}
   */
  get_request(url, headers, query) {
    let fullUrl = url + query;
    const opts = {
      "method": "GET",
      "contentType": "application/json",
      "headers": headers,
      "muteHttpExceptions": true,
    }

    return this.UrlFetchApp.fetch(fullUrl, opts);
    
  }

  post_request(url, headers, data=null) {
    const opts = {
      "method": "POST",
      "contentType": "application/json",
      "headers": headers,
    }

    // Every POST request expects a payload. 
    // Only stringify the payload if it exists. If it doesn't, throw an error.
    if(data) {
      opts['payload'] = JSON.stringify(data)
    } else {
      throw new IncompleteRequestError("POST requests expect a JSON payload.")
    }

    return this.UrlFetchApp.fetch(url, opts)
  }

  put_request_(url, headers, data=null, payload={}) {
    const opts = {
      "method": "PUT",
      "contentType": "application/json",
      "headers": headers
    }
  }

  /** 
   * Make a request to the Canvas API and return the response
    * @param {string} method    HTTP method
    * @param {string} endpoint  The Canvas endpoint
    * @param {Object} payload   Optional arguments to use with the request 
    * @param {Object} headers   Optional headers to include
    * 
    * @returns {CanvasResponse}
  */
  request(method, endpoint, url, payload=null, headers=null) {
    let query = "";
    let req_method, response;

    // serialize an object of options into a querystring for the API call
    if(payload) {
      query = serialize_(payload)
    }

    method = method.toUpperCase();
    const full_url =  url || `${this._baseUrl}${endpoint}`;
    
    if (!headers) {
      headers = {
        "Authorization": "Bearer " + this._accessToken
      }
    }    

    if(method === "GET") {
      req_method = this.get_request.bind(this);
    } else if(method === "POST") {
      req_method = this.post_request.bind(this);
      // throw new NotImplementedError('POST not implemented. Use a native UrlFetchApp.fetch() request.')
    } else if(method === "PUT") {
      // req_method = this.put_request.bind(this);
      throw new NotImplementedError('PUT not implemented. Use a native UrlFetchApp.fetch() request.')
    } else if(method === "DELETE") {
      // req_method = this.delete_request.bind(this);
      throw new NotImplementedError('DELETE not implemented. Use a native UrlFetchApp.fetch() request.')
    }

    response = req_method(full_url, headers, query)
  
    const status = response.getResponseCode()
    // Handle response codes
    switch(status) {
      case 400:
        throw new Error(`400: Bad Request`)
      case 401:
        if(response.getHeaders().hasOwnProperty('WWW-Authenticate')) {
          throw new Error(`Invalid access token.`)
        } else {
          throw new Error(`Unauthorized`)
        }
      case 403:
        throw new Error(`Forbidden`) // This could also be rate limiting. Need a better check.
      case 404:
        throw new Error(`Not found`)
      case 409:
        throw new Error(`Conflict: ${response.getContentText()}`)
      case 422:
        throw new Error(`Unprocessable request`)
    }

    if(status >= 500) {
      throw new Error(`Encoutered an error: status code ${status}`)
    }

    return {
      json: () => response.getContentText(),
      status: () => status,
      headers: () => response.getHeaders()
    }
  }

}