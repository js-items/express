// tslint:disable:no-any
import * as sourceMapSupport from 'source-map-support';
import assertOnReplaceItem from '../utils/assertOnReplaceItem';
import initTests from '../utils/initTests';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { ItemNotFoundError } from '@js-items/foundation';
import { Options as ReplaceItemOptions } from '@js-items/foundation/dist/functions/ReplaceItem';
import testItem, {
  TestItem,
} from '@js-items/foundation/dist/functions/utils/testItem';
import { NOT_FOUND, OK } from 'http-status-codes';
import { TEST_URL } from '../../constants';
import createInMemoryService from '../utils/createInMemoryService';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

const notExistingId = 'not-existing-id';

const replaceItem = jest.fn(
  async ({ item, id }: ReplaceItemOptions<TestItem>) => {
    if (id !== testItem.id) {
      return Promise.reject(new ItemNotFoundError('item', testItem.id));
    }

    return Promise.resolve({ item });
  }
);

describe('@replaceItem', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const service = createInMemoryService({
    replaceItem,
  });

  const { request } = initTests<TestItem>({ service });

  const expectedParams = {
    filter: {},
    id: testItem.id,
    item: testItem,
  };

  const defaultOptions = {
    body: testItem,
    client: request,
    expectedParams,
    replaceItem,
    url: `${TEST_URL}/${testItem.id}`,
  };

  const notFoundOptions = {
    body: { ...testItem, id: notExistingId },
    expectedParams: {
      ...expectedParams,
      id: notExistingId,
      item: { ...testItem, id: notExistingId },
    },
  };

  it('throws not found error when item does exist', async () => {
    await assertOnReplaceItem({
      ...defaultOptions,
      ...notFoundOptions,
      status: NOT_FOUND,
      url: `${TEST_URL}/${notExistingId}`,
    });
  });

  it('throws not found error when item does exist and envelope is enabled', async () => {
    await assertOnReplaceItem({
      ...defaultOptions,
      ...notFoundOptions,
      params: {
        envelope: true,
      },
      status: OK,
      url: `${TEST_URL}/${notExistingId}`,
    });
  });

  it('replaces item', async () => {
    const updatedItem = {
      booleanProperty: true,
      id: testItem.id,
      numberProperty: 999,
      stringProperty: 'testowo',
    };

    await assertOnReplaceItem({
      ...defaultOptions,
      body: updatedItem,
      expectedParams: {
        ...expectedParams,
        item: updatedItem,
      },
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
