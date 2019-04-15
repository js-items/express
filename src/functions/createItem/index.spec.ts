// tslint:disable:no-any
import * as sourceMapSupport from 'source-map-support';
import assertOnCreateItem from '../utils/assertOnCreateItem';
import initTests from '../utils/initTests';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { ConflictingItemError } from '@js-items/foundation';
import { Options as CreateItemOptions } from '@js-items/foundation/dist/functions/CreateItem';
import testItem, {
  TestItem,
} from '@js-items/foundation/dist/functions/utils/testItem';
import { CONFLICT, OK } from 'http-status-codes';
import { TEST_URL } from '../../constants';
import createInMemoryService from '../utils/createInMemoryService';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

const notExistingId = 'not-existing-id';

const createItem = jest.fn(
  async ({ item, id }: CreateItemOptions<TestItem>) => {
    if (id === testItem.id) {
      return Promise.reject(new ConflictingItemError('item', testItem.id));
    }

    return Promise.resolve({ item });
  }
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
    id: testItem.id,
    item: testItem,
  };

  const defaultOptions = {
    body: testItem,
    client: request,
    createItem,
    expectedParams,
    url: TEST_URL,
  };

  it('throws conflicting error when item does exist', async () => {
    await assertOnCreateItem({
      ...defaultOptions,
      status: CONFLICT,
    });
  });

  it('throws conflicting error when item does exist and envelope is enabled and pretty is disabled', async () => {
    await assertOnCreateItem({
      ...defaultOptions,
      params: {
        envelope: true,
        pretty: false,
      },
      status: OK,
    });
  });

  it('throws conflicting error when item does exist and envelope is enabled and pretty is enabled', async () => {
    await assertOnCreateItem({
      ...defaultOptions,
      params: {
        envelope: true,
      },
      status: OK,
    });
  });

  it('creates item', async () => {
    await assertOnCreateItem({
      ...defaultOptions,
      body: {
        ...testItem,
        id: notExistingId,
      },
      expectedParams: {
        id: notExistingId,
        item: { ...testItem, id: notExistingId },
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
        id: notExistingId,
        item: { ...testItem, id: notExistingId },
      },
      params: {
        envelope: true,
      },
      status: OK,
    });
  });
// tslint:disable-next-line:max-file-line-count
});
