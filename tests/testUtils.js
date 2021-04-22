import test from 'ava';
import { Course } from '../src/modules/Course.js';
import * as utils from '../src/modules/Utils.js';

test('parseLinkHeader zero length', t => {
    let links = '';
    let err = t.throws(() => {
        utils.parseLinkHeader_(links);
    }, {instanceOf: Error})
    t.is(err.message, 'input must not be of zero length')
})
test('parseLinkHeader valid', t => {
    let raw = '<https://example.com>;rel="current",<https://example.com/?page=2>;rel="next"'
    let actual = utils.parseLinkHeader_(raw)
    let expected = {
        "current": "https://example.com",
        "next": "https://example.com/?page=2"
    }
    t.like(actual, expected);
})
test('objOrId int', t => {
    const actual = utils.objOrId_(123, "course", [Course,]);
    t.assert(typeof actual === "number")
    t.is(actual, 123)
})
test('objOrId object', t => {
    const mock = new Course({}, {"id": 123, "name": "Test course"})
    const actual = utils.objOrId_(mock, "course", [Course,]);

    t.assert(typeof actual === "number")
    t.is(actual, 123)
})
test('objOrStr string', t => {
    const mock = new Course({}, {"id": 123, "name": "Test course"})
    const actual = utils.objOrStr_(mock, "name", [Course,])
    console.log(actual)
    t.assert(typeof actual === "string")
    t.is(actual, "Test course")
})
test('objOrStr non-string param', t => {
    const mock = new Course({}, {"id": 123, "name": "Test course"})
    const err = t.throws(() => {
        utils.objOrStr_(mock, mock, [Course,])
    }, {instanceOf: Error})
    t.is(err.message, `Attribute parameter Course must be of type String.`)
})
test('objOrStr no attribute', t => {
    const mock = new Course({}, {"id": 123, "name": "Test course"})
    const err = t.throws(() => {
        utils.objOrStr_(mock, "displayName", [Course,])
    }, {instanceOf: Error})
    t.is(err.message, "Course does not have displayName attribute.")
})
test('serialize invalid', t => {
    const mock = "invalid"
    const err = t.throws(() => {
        utils.serialize_(mock);
    }, {instanceOf: Error});
    t.is(err.message, 'param must be an object.');
})
test('serialize empty', t => {
    const mock = {}
    const actual = utils.serialize_(mock)
    t.is(actual, '')
})
test('serialize valid', t => {
    const mock = {
        "param1": "abc123",
        "param2": "xyz098"
    }
    const actual = utils.serialize_(mock);
    t.is(actual, "?param1=abc123&param2=xyz098");
})