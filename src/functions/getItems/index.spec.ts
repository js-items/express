// tslint:disable:no-object-literal-type-assertion
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
import { BAD_REQUEST } from 'http-status-codes';
dotenv.config();
import { Result as GetItemsResult } from '@js-items/foundation/dist/functions/GetItems';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { start } from '@js-items/foundation/dist/interfaces/Cursor';
import { TEST_URL } from '../../constants';
import assertOnGetItems from '../utils/assertOnGetItems';
import createInMemoryService from '../utils/createInMemoryService';
import initTests from '../utils/initTests';

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

  const { request } = initTests({ service });

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

  const defaultOptions = {
    client: request,
    getItems,
    params: defaultParams,
    url: TEST_URL,
  };

  const expectedParams = {
    filter,
    pagination: {
      after,
      before: undefined,
      limit: 1,
    },
    sort,
  };

  it('gets items', async () => {
    await assertOnGetItems({
      ...defaultOptions,
      expectedParams,
    });
  });

  it('gets items when envelope enabled and count query param provided', async () => {
    await assertOnGetItems({
      ...defaultOptions,
      expectedParams,
      params: {
        ...defaultOptions.params,
        count: true,
        envelope: true,
      },
    });
  });

  it('gets items when envelope enabled and pretty response is disabled', async () => {
    await assertOnGetItems({
      ...defaultOptions,
      expectedParams,
      params: {
        ...defaultOptions.params,
        envelope: true,
        pretty: false,
      },
    });
  });

  it('throws JsonError when sort is invalid', async () => {
    await assertOnGetItems({
      ...defaultOptions,
      params: {
        ...defaultOptions.params,
        filter: 'invalid_sort',
      },
      status: BAD_REQUEST,
    });
  });

  it('throws JsonError when sort is invalid', async () => {
    await assertOnGetItems({
      ...defaultOptions,
      params: {
        ...defaultOptions.params,
        sort: 'invalid_sort',
      },
      status: BAD_REQUEST,
    });
  });

  it('throws NumberError when limit is invalid', async () => {
    await assertOnGetItems({
      ...defaultOptions,
      params: {
        ...defaultOptions.params,
        limit: 'not_numeric',
      },
      status: BAD_REQUEST,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
