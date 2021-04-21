import test from 'ava';
import {Requester} from '../src/modules/Requester.js';
import {registerMock_} from '../src/mocks/mock.js'

test.before(t => { global.UrlFetchApp = {} })

test('Requester.constructor', t => {
    const requester = new Requester('https://example.com', 'abc123');
    t.assert(requester instanceof Requester)
})
test('Requester.request 400', t => {
    const mock = registerMock_("requests", "400");
    const requester = new Requester('https://example.com', 'abc123', {UrlFetchApp_: mock});
    const resp = t.throws(() => {
        requester.request("GET", "400").json();
    }, {instanceOf: Error})
    t.is(resp.message, "400: Bad Request");
})
test('Requester.request 401', t => {
    const mock = registerMock_("requests", "401_invalid_access_token");
    const requester = new Requester('https://example.com', 'abc123', {UrlFetchApp_: mock});
    const resp = t.throws(() => {
        requester.request("GET", "401").json();
    }, {instanceOf: Error})
    t.is(resp.message, "Invalid access token.");
})