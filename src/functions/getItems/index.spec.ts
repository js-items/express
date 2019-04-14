// tslint:disable:no-object-literal-type-assertion
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
import { BAD_REQUEST, OK } from 'http-status-codes';
dotenv.config();
import { Result as GetItemsResult } from '@js-items/foundation/dist/functions/GetItems';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { start } from '@js-items/foundation/dist/interfaces/Cursor';
import { TEST_URL } from '../../constants';
import createInMemoryService from '../../utils/createInMemoryService';
import createTestUrl from '../../utils/createTestUrl';
import initTests from '../../utils/initTests';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

const getItems = jest.fn(() =>
  Promise.resolve({
    cursor: {
      after: start,
      before: start,
      hasAfter: false,
      hasBefore: false,
    },
    items: [{ id: '1' }, { id: '2' }],
  } as GetItemsResult<TestItem>)
);

describe('@getItems', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const service = createInMemoryService({
    getItems,
  });

  const { request } = initTests<TestItem>({ service });

  const filter = { id: { $in: ['1', '2'] } };
  const sort = { id: 'desc' };
  const limit = '1';
  const after = 'eyJpZCI6ImlkMSJ9';

  const defaultParams = {
    after,
    filter: JSON.stringify(filter),
    limit,
    sort: JSON.stringify(sort),
  };

  it('gets items', async () => {
    const url = createTestUrl({ url: TEST_URL, params: defaultParams });

    const { status, body } = await request.get(url).send();

    expect(status).toBe(OK);
    expect(body).toMatchSnapshot();
    expect(getItems).toBeCalledWith({
      filter,
      pagination: {
        after,
        before: undefined,
        limit: 1,
      },
      sort,
    });
  });

  it('gets items when envelope enabled and count query param provided', async () => {
    const params = {
      ...defaultParams,
      count: true,
      envelope: true,
    };

    const url = createTestUrl({ url: TEST_URL, params });

    const { status, body } = await request.get(url).send();

    expect(status).toBe(OK);
    expect(body).toMatchSnapshot();
  });

  it('gets items when envelope enabled and pretty response is disabled', async () => {
    const params = {
      ...defaultParams,
      envelope: true,
      pretty: false,
    };

    const url = createTestUrl({ url: TEST_URL, params });

    const { status, body } = await request.get(url).send();

    expect(status).toBe(OK);
    expect(body).toMatchSnapshot();
  });

  it('throws JsonError when sort is invalid', async () => {
    const params = {
      sort: 'invalid_filter',
    };
    const url = createTestUrl({ url: TEST_URL, params });

    const { status, body } = await request.get(url).send();

    expect(status).toBe(BAD_REQUEST);
    expect(body).toMatchSnapshot();
  });

  it('throws NumberError when limit is invalid', async () => {
    const params = {
      limit: 'not_numeric',
    };
    const url = createTestUrl({ url: TEST_URL, params });

    const { status, body } = await request.get(url).send();

    expect(status).toBe(BAD_REQUEST);
    expect(body).toMatchSnapshot();
  });
  // tslint:disable-next-line:max-file-line-count
});
