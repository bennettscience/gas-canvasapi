import {fixtures_} from './fixtures.js';

/**
 * @typedef {Object} mock
 * @property {Object} params Fixture object to mock the resource.
 */

/**
 * @returns {mock}
 */
export class Mock_ {
  constructor(params) {
    for(var name in params) {
      Object.defineProperty(this, name, {
        value: params[name],
        configurable: true,
        enumerable: true
      })
    }
  }

  /**
   * 
   * @returns {Object}
   * @property {function} getContentText
   * @property {function} getResponseCode
   * @property {function} getHeaders
   */
  fetch() {
    return {
      getContentText: () => this.data,
      getResponseCode: () => Number(this.status_code),
      getHeaders: () => this.headers,
    }
  }
}

// Access the specified fixtures for unit testing
/**
 * 
 * @param {String} requirement Object key from fixtures
 * @param {String} endpoint Endpoing to simulate
 * @returns {Object} Mock
 */
export function registerMock_(requirement, endpoint) {
  const f = fixtures_.init();
  let mock = new Mock_(f[requirement][endpoint])

  return mock
}

// from the python implementation, better checks on params going into the mock.
// Work this in some day...
//   }
//     for fixture, objects in requirements.items():
//         try:
//             with open("tests/fixtures/{}.json".format(fixture)) as file:
//                 data = json.loads(file.read())
//         except (IOError, ValueError):
//             raise ValueError("Fixture {}.json contains invalid JSON.".format(fixture))

//         if not isinstance(objects, list):
//             raise TypeError("{} is not a list.".format(objects))

//         for obj_name in objects:
//             obj = data.get(obj_name)

//             if obj is None:
//                 raise ValueError(
//                     "{} does not exist in {}.json".format(obj_name.__repr__(), fixture)
//                 )

//             method = requests_mock.ANY if obj["method"] == "ANY" else obj["method"]
//             if obj["endpoint"] == "ANY":
//                 url = requests_mock.ANY
//             else:
//                 url = base_url + obj["endpoint"]

//             try:
//                 requests_mocker.register_uri(
//                     method,
//                     url,
//                     json=obj.get("data"),
//                     status_code=obj.get("status_code", 200),
//                     headers=obj.get("headers", {}),
//                 )
//             except Exception as e:
//                 print(e)
