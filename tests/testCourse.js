import test from 'ava';
import {registerMock_} from '../src/mocks/mock.js'
import {Assignment} from '../src/modules/Assignment.js'
import {Course} from '../src/modules/Course.js'
import { MissingRequriedFieldError } from '../src/modules/Error.js';
import { Requester } from '../src/modules/Requester.js';


test('Create a new assignment', t => {
    let mock = registerMock_("course", "create_assignment");
    const requester = new Requester("https://www.example.com", "abc123", {UrlFetchApp_: mock})

    // Manually create a course to run the test against.
    const course = new Course(requester, {id: 1})
    let response = course.createAssignment({
        "name": "My new assignment"
    })
    t.assert(response instanceof Assignment)
    t.is(response.name, "Newly Created Assignment")
})

test('Create bad assignment', t => {
    let mock = registerMock_("course", "create_assignment");
    const requester = new Requester("https://www.example.com", "abc123", {UrlFetchApp_: mock})

    const course = new Course(requester, {id: 1})
    t.throws(() => {
        course.createAssignment({})
    }, {instanceOf: MissingRequriedFieldError})
})