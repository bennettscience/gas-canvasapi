# GAS-CanvasApi

The Canvas API has a robust set of REST endpoints which can be used to automate
many functions and features of the LMS. This library can be used to interact
with the Canvas LMS REST API within Google Apps Script.

**Note that this is actively being written and _probably_ shouldn't be used for
important things yet.**

## Why?

I use the [canvasapi](https://github.com/ucfopen/canvasapi) Python library, but
most of that data is moved into Google for sharing and analysis. This Apps
Script library will allow you to pull data right into Google Sheets without
relying on another langauge.

## Getting Started

Library ID: `1A_9Cxj-tkYUsoxYAKQ-X_WAVhzzRyMgdWmJJfACqDHGEu6lmSKBsTcLR`

After installing the library, You can set up your initial connection by creating
a `Canvas` object:

```javascript
function myFunction() {
    const { Canvas } = canvasapi.modules();
    let canvas = Canvas(yourUrl, yourApiKey);
    let course = canvas.getCourse(yourCourseId);

    console.log(course.name);
}
```

Each Class has methods documented with JSDoc annotations to allow for
autocompelte when using the GAS IDE online.

## Calling Missing Endpoints

There are a few of my commonly-hit endpoints available, but you can define your
own request with `canvas._requester.request()` once you've instantiated:

```javascript
function myFunction() {
    const { Canvas } = canvasapi.modules();

    let canvas = new Canvas(yourUrl, yourKey);

    // get all modules in a course.
    let modules = canvas._requester
        .request('GET', 'courses/:courseId/modules')
        .json();

    for (let mod of JSON.parse(modules)) {
        console.log(mod.name);
    }
}
```

You can also skip creating the `Canvas` object directly and simply create a
`Requester` instance to call API endpoints manually:

```javascript
function myFunction() {
    const { Requester } = canvasapi.modules();

    let requester = new Requester(yourUrl, yourKey);

    // get all assignments in a course
    let assignments = requester
        .request('GET', 'courses/:courseId/assignments')
        .json();

    for (let assignment of JSON.parse(assignments)) {
        console.log(assignment.name);
    }
}
```

## Pagination

Canvas returns paginated results by default. The `PaginatedList` class returns
an iterable which will automatically paginate results if there are more results.
You can specify up to 100 results per page in your request querystring. Most
methods default to 10.

```javascript
function myFunction() {
    const { Canvas } = canvasapi.modules();
    const canvas = new Canvas(yourUrl, yourKey);
    const course = canvas.getCourse(courseId);

    // getAssignments() returns a PaginatedList of results you can iterate
    let assignments = course.getAssignments();

    for (let item of assignments) {
        console.log(item.name);
    }

    // Or you can destructure the array
    console.log([...assignments]);

    // Or cast to an arry directly
    let myArray = new Array(assignments);
}
```

Each item in the `PaginatedList` is a class, you can also call any available
methods on the array items.

## Contributing

If you'd like to contribute, clone the project and add modules in `/src/modules`
as fit.

### Writing tests

Testing relies on response stubs in `src/mocks/fixtures`. Each endpoint returns
structured data and these fixtures are based on the
[Canvas API documentation](https://canvas.instructure.com/doc/api/).

Dependency injection is used to bypass Google Apps Script's `UrlFetchApp` class
by passing in a fixture. For each test which runs against a Canvas endpoint, a
fixture needs to be passed into `registerMock_` to build the `Mock` object.

Each fixture is defined by the class you're testing and the endpoint method you
need to test. The example below shows how to get an expected return from
`https://canvas.instructure.com/api/v1/courses/:id`:

```javascript
import test from 'ava';
import { registerMock_ } from '../src/mocks/mock.js';
import { Canvas } from '../src/modules/Canvas.js';

test('Get a single course', (t) => {
    const mock = registerMock_('courses', 'get_by_id');

    // instantiate Canvas with the mock
    const canvas = new Canvas('https://example.com', 'abc123', { Mock_: mock });
    const actual = canvas.getCourse(1);

    // ... your assertions
});
```

Run the test suite with `npm run test`.

---

This project uses the
[AppsScripts Modules Template](https://github.com/classroomtechtools/appsscriptsModules)
by [Adam Morris](https://github.com/classroomtechtools), who has been
immeasureably helpful by answering my questions. Go check his work out if you're
an Apps Script developer.
