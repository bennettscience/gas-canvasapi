/** 
* Extract the Link header URLs into an object for easier usage.
* Note that that this will not work on URLs which contain commas.
* 
* @param {string} header   Link header from an API call
* 
* @returns {object} links  Object with each url keyed to it's rel
*/
export function parseLinkHeader_(header) {
  if (header.length === 0) {
    throw new Error("input must not be of zero length");
  }
  
  // Split parts by comma
  var parts = header.split(',');
  var links = {};
  // Parse each part into a named link
  for(var i=0; i<parts.length; i++) {
    var section = parts[i].split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, '$1').trim();
    var name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  }
  return links;
}

/** 
* Determine if the param is a typed object or an ID. If it is an
* ID, return the integer. If it is an object of the valid type,
* return the object's ID.
* 
* @param {integer, 
*         string, 
*         object}      param      The value to check
* @param {string}      paramName   
* @param {object[]}    types      Types to check
* 
* @returns {Integer}  A valid Canvas ID as an integer      
*/
export function objOrId_(param, paramName, types) {
  if(Number(param)) {
    return Number(param)
  } else {
    for(var objType of types) {
      if(param instanceof objType) {
        try {
          return Number(param.id)
        } catch(e) {
          break
        }
      }
    }
  }
  
  throw new Error(`${paramName} must be an instance of ${types}`)
}

/**
* Accepts an object. If the object has the attribute, return the
* string value. If the submitted object is a child class,
* check the parent type for the attribute. Otherweise, throw an error.
* 
* @param {object}    obj
* @param {string}    attr
* @param {object[]}  types
*/
export function objOrStr_(obj, prop, types) {
  if(typeof prop !== "string") {
    throw new Error(`Attribute parameter ${prop.constructor.name} must be of type String.`)
  }
    
  if(obj[prop] !== undefined) {
    return String(obj[prop])
  } else {
    for(var objType of types) {
      if(prop instanceof objType) {
        if(objType[prop] !== undefined)
        return objType[prop]
      } else {
        throw new Error(`${objType.classType()} does not have ${prop} attribute.`)
      }
    }
  }
}

/** 
* Serialize an object into a URL-safe string
* 
* @param {Object} params   The object to serialize
* @returns {String}
*/
export function serialize_(obj) {
  if(typeof obj !== "object") { 
    throw new Error(`param must be an object.`)
  }

  if(Object.keys(obj).length === 0) {
    return '';
  }

  let str = '?' + Object.keys(obj).reduce(function(arr, key){
    if(Array.isArray(obj[key])) {
      obj[key].forEach(function(item) {
        arr.push(key + '[]=' + encodeURIComponent(item))
      })
    } else {
      arr.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return arr;
  }, []).join('&');
  
  return str;
}