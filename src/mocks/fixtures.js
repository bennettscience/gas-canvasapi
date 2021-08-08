export const fixtures_ = (function() {
  
  const init = function() {
    return this;
  }

  const course = {
    "create_assignment": {
      "method": "POST",
      "endpoint": "courses/1/assignments",
      "data": {
        "id": 1,
        "course_id": 1,
        "name": "Newly Created Assignment",
        "description": "Do this assignment"
      },
      "status_code": 200
	  },
  }

  const courses = {
    "get_by_id": {
      "method": "GET",
      "endpoint": "courses/1",
      "data": {
        "id": 1,
        "course_code": "TST1234",
        "name": "Test Course 1234",
        "workflow_state": "available",
        "account_id": 1,
        "root_account_id": 1,
        "enrollment_term_id": 1,
        "grading_standard_id": 1
      },
      "status_code": 200
    },
    "get_by_id_2": {
      "method": "GET",
      "endpoint": "courses/2",
      "data": {
        "id": 2,
        "course_code": "TST5678",
        "name": "Test Course 5678",
        "workflow_state": "available",
        "account_id": 1,
        "root_account_id": 1,
        "enrollment_term_id": 1,
        "grading_standard_id": 1
      },
      "status_code": 200
    }
  }

  const paginatedList = {
    "empty": {
      "method": "ANY",
      "endpoint": "empty_list",
      "data": [],
      "status_code": 200,
      "headers": {
        "Link": "<https://elkhart.instructure.com/api/v1/courses?page=1&per_page=100>; rel=\"current\""
      }
    },
    "single": {
      "method": "ANY",
      "endpoint": "single_item",
      "data": [
        {
          "id": "1",
          "name": "object 1"
        }
      ],
      "headers": {
        "Link": "<https://elkhart.instructure.com/api/v1/courses?page=1&per_page=100>; rel=\"current\""
      },
      "status_code": 200
    },
    "2_1_page": {
      "method": "ANY",
      "endpoint": "two_objects_one_page",
      "data": [
        {
          "id": "1",
          "name": "object 1"
        },
        {
          "id": "2",
          "name": "object 2"
        }
      ],
      "headers": {
        "Link": "<https://elkhart.instructure.com/api/v1/courses?page=1&per_page=100>; rel=\"current\""
      },
      "status_code": 200
    }
  }

  const requests = {
    "400": {
      "method": "ANY",
      "endpoint": "400",
      "data": {},
      "status_code": 400
    },
    "401_invalid_access_token": {
      "method": "ANY",
      "endpoint": "401_invalid_access_token",
      "data": {},
      "headers": {
        "WWW-Authenticate": "Bearer realm=\"canvas-lms\""
      },
      "status_code": 401
    },
    "401_unauthorized": {
      "method": "ANY",
      "endpoint": "401_unauthorized",
      "data": {},
      "status_code": 401
    },
    "403": {
      "method": "ANY",
      "endpoint": "403",
      "data": {},
      "status_code": 403
    },
    "403_rate_limit": {
      "method": "ANY",
      "endpoint": "403_rate_limit",
      "data": "403 Forbidden (Rate Limit Exceeded)",
      "headers": {
        "X-Rate-Limit-Remaining": "3.14159265359",
        "X-Request-Cost": "1.61803398875"
      },
      "status_code": 403
    },
    "403_rate_limit_no_remaining_header": {
      "method": "ANY",
      "endpoint": "403_rate_limit_no_remaining_header",
      "data": "403 Forbidden (Rate Limit Exceeded)",
      "headers": {
        "X-Request-Cost": "1.61803398875"
      },
      "status_code": 403
    },
    "404": {
      "method": "ANY",
      "endpoint": "404",
      "data": {},
      "status_code": 404
    },
    "409": {
      "method": "ANY",
      "endpoint": "409",
      "data": {},
      "status_code": 409
    },
    "422": {
      "method": "ANY",
      "endpoint": "422",
      "data": {},
      "status_code": 422
    },
    "500": {
      "method": "ANY",
      "endpoint": "500",
      "data": {},
      "status_code": 500
    },
    "502": {
      "method": "ANY",
      "endpoint": "502",
      "data": {},
      "status_code": 502
    },
    "503": {
      "method": "ANY",
      "endpoint": "503",
      "data": {},
      "status_code": 503
    },
    "absurd": {
      "method": "ANY",
      "endpoint": "absurd",
      "data": {},
      "status_code": 9001
    },
    "delete": {
      "method": "DELETE",
      "endpoint": "fake_delete_request",
      "data": {},
      "status_code": 200
    },
    "get": {
      "method": "GET",
      "endpoint": "fake_get_request",
      "data": "Hello world!",
      "status_code": 200
    },
    "post": {
      "method": "POST",
      "endpoint": "fake_post_request",
      "data": {},
      "status_code": 200
    },
    "patch": {
      "method": "PATCH",
      "endpoint": "fake_patch_request",
      "data": {},
      "status_code": 200
    },
    "put": {
      "method": "PUT",
      "endpoint": "fake_put_request",
      "data": {},
      "status_code": 200
    }
  }

  return {
    init: init,
    course: course,
    courses: courses,
    paginatedList: paginatedList,
    requests: requests,
  }
})()
