# GAS-CanvasApi

The Canvas API has a robust REST endpoint which can be used to extend many
functions and features of the LMS. This library can be used to interact with the
Canvas LMS REST API within Google Apps Script.

## Why?

I use the [canvasapi](https://github.com/ucfopen/canvasapi) Python library, but
most of that data is moved into Google for sharing and analysis. This Apps
Script library will allow you to pull data right into Google Sheets without
relying on another langauge.

## Getting Started

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

    let canvas = Canvas(Settings.prodUrl, Settings.prodKey);

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

This project uses the
[AppsScripts Modules Template](https://github.com/classroomtechtools/appsscriptsModules)
by [Adam Morris](https://github.com/classroomtechtools), who has been
immeasureably helpful by answering my questions. Go check his work out if you're
an Apps Script developer.
