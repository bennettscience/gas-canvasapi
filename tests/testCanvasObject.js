import test from 'ava';
import {CanvasObject} from '../src/modules/CanvasObject.js';

test.before(t => {
    global.Requester = {}
})

test('Create a new CanvasObject', t => {
    const requester = global.Requester;
    const data = {
        "name": "Test",
        "id": 1
    }
    const actual = new CanvasObject(requester, data);
    t.assert(actual instanceof CanvasObject);
    t.is(actual.id, 1)
    t.is(actual.name, "Test")
    t.is(actual.someProp, undefined)
    
})