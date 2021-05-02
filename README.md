# GAS-CanvasApi

The Canvas API has a robust REST endpoint which can be used to extend many
functions and features of the LMS. This library can be used to interact with the
Canvas LMS REST API within Google Apps Script.

**Note that this is actively being written and _probably_ shouldn't be used for
important things yet.**

## Why?

I use the [canvasapi](https://github.com/ucfopen/canvasapi) Python library, but
most of that data is moved into Google for sharing and analysis. This Apps
Script library will allow you to pull data right into Google Sheets without
relying on another langauge.

## Getting Started

Library ID: `1A_9Cxj-tkYUsoxYAKQ-X_WAVhzzRyMgdWmJJfACqDHGEu6lmSKBsTcLR`

The main methods of interaction are finished. After installing the library, You
can set up your initial connection like so:

```javascript
function myFunction() {
    const { Canvas } = canvasapi.modules();
    let canvas = Canvas(yourUrl, yourApiKey);
    let course = canvas.getCourse(yourCourseId);

    console.log(course.name);
}
```

## Defining endpoints

There are a few of my commonly-hit endpoints available, but you can define your
own request with `canvas._requester.request()` once you've instantiated:

```javascript
function myFunction() {
    const { Canvas } = canvasapi.modules();

    let canvas = Canvas(yourUrl, yourKey);

    // get all modules in a course.
    let modules = canvas._requester
        .request('GET', 'courses/:courseId/modules')
        .json();

    for (let mod of JSON.parse(modules)) {
        console.log(mod.name);
    }
}
```

## Contributing

If you'd like to contribute, clone the project and add modules in `/src/modules`
as fit. Tests will be added in the near future.

### Writing tests

Testing relies on response stubs in `src/mocks/fixtures`. Each endpoint returns
structured data and these fixtures are based on the
[Canvas API documentation]().

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

This project uses the
[AppsScripts Modules Template](https://github.com/classroomtechtools/appsscriptsModules)
by [Adam Morris](https://github.com/classroomtechtools), who has been
immeasureably helpful by answering my questions. Go check his work out if you're
an Apps Script developer.
