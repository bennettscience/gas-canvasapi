import test from 'ava';
import {Canvas} from '../src/modules/Canvas.js';
import {Assignment} from '../src/modules/Assignment.js';
import {PaginatedList} from '../src/modules/PaginatedList.js';
import {registerMock_} from '../src/mocks/mock.js';

test('Get a paginated list', t => {
    const mock = registerMock_("paginatedList", "empty");
    const canvas = new Canvas("https://example.com", "abc123", {Mock_: mock})
    const actual = new PaginatedList(Assignment, canvas._requester, "GET", "empty")

    t.is([...actual].length, 0)
})
test('Get list of one item', t => {
    const mock = registerMock_("paginatedList", "single");
    const canvas = new Canvas("https://www.example.com", "abc123", {Mock_: mock})
    const actual = new PaginatedList(Assignment, canvas._requester, "GET", "single")

    t.assert([...actual].length === 1)
})
test('Get list of two items', t => {
    const mock = registerMock_("paginatedList", "2_1_page")
    const canvas = new Canvas("https://www.example.com", "abc123", {Mock_: mock})
    const actual = new PaginatedList(Assignment, canvas._requester, "GET", "2_1_page")

    t.assert([...actual].length === 2);
})