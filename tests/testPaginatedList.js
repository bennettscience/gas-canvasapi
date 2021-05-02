import test from 'ava';
import {Canvas} from '../src/modules/Canvas.js';
import {Course} from '../src/modules/Course.js';
import {PaginatedList} from '../src/modules/PaginatedList.js';
import {registerMock_} from '../src/mocks/mock.js';

test('Get a paginated list', t => {
    const mock = registerMock_("paginatedList", "empty");
    const canvas = new Canvas("https://example.com", "abc123", {Mock_: mock})
    const actual = new PaginatedList(Course, canvas._requester, "GET", "empty")

    console.log([...actual])

    t.is([...actual].length, 0)
})