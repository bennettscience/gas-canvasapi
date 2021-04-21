import test from 'ava';
import {registerMock_} from '../src/mocks/mock.js'
import {Canvas} from '../src/modules/Canvas.js';
import {UrlFetchApp} from '../src/mocks/UrlFetchApp.js';


test.before(t => { global.UrlFetchApp = UrlFetchApp })

test("Create a new Canvas object", t => {
    const canvas = new Canvas("https://example.com", "abc123");
    t.assert(canvas instanceof Canvas)
})
test("Fail with no API key", t => {
    const err = t.throws(() => {
        new Canvas("https://example.com"), {instanceOf: Error}
    })
    t.is(err.message, "You must provide an access token.")
})
test("Fail with no URL", t => {
    const err = t.throws(() => {
        new Canvas("", "abc123")}, {instanceOf: Error})
    t.is(err.message, "You must provide a valid URL.")
})

test("Fail with insecure protocol", t => {
    const err = t.throws(() => {
        new Canvas('http://example.com', {instanceOf: Error})
    })
    t.is(err.message, "https:// secure protocol required in the url.")
})
test("Fail with API suffix on URL", t => {
    const err = t.throws(() => {
        new Canvas('https://example.com/api/v1', {instanceOf: Error})
    })
    t.is(err.message, "Do not include api/v1 in your URL.")
})
test("Get a single course", t => {
    const mock = registerMock_("courses", "get_by_id");
    const canvas = new Canvas("https://example.com", "abc123", {Mock_: mock})
    const course = canvas.getCourse(1)
    t.assert(canvas instanceof Canvas)
})