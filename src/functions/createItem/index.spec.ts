// tslint:disable:no-any
import * as sourceMapSupport from 'source-map-support';
import assertOnCreateItem from '../utils/assertOnCreateItem';
import initTests from '../utils/initTests';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { Options as CreateItemOptions } from '@js-items/foundation/dist/functions/CreateItem';
import testItem, {
  TestItem,
} from '@js-items/foundation/dist/functions/utils/testItem';
import { OK } from 'http-status-codes';
import { TEST_URL } from '../../constants';
import createInMemoryService from '../utils/createInMemoryService';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

const notExistingId = 'not-existing-id';

const createItem = jest.fn(async ({ item }: CreateItemOptions<TestItem>) =>
  Promise.resolve({ item })
);

describe('@createItem', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const service = createInMemoryService({
    createItem,
  });

  const { request } = initTests<TestItem>({ service });

  const expectedParams = {
    id: '1',
    item: { ...testItem, id: '1' },
  };

  const defaultOptions = {
    body: testItem,
    client: request,
    createItem,
    expectedParams,
    url: TEST_URL,
  };

  it('creates item', async () => {
    await assertOnCreateItem({
      ...defaultOptions,
      body: {
        ...testItem,
      },
      expectedParams: {
        id: '1',
        item: { ...testItem, id: '1' },
      },
    });
  });

  it('creates item when envelope is enabled', async () => {
    await assertOnCreateItem({
      ...defaultOptions,
      body: {
        ...testItem,
        id: notExistingId,
      },
      expectedParams: {
        id: '1',
        item: { ...testItem, id: '1' },
      },
      params: {
        envelope: true,
      },
      status: OK,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
