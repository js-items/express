// tslint:disable:no-any
import * as sourceMapSupport from 'source-map-support';
import assertOnDeleteItem from '../utils/assertOnDeleteItem';
import initTests from '../utils/initTests';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { ItemNotFoundError } from '@js-items/foundation';
import { Options as DeleteItemOptions } from '@js-items/foundation/dist/functions/DeleteItem';
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

const deleteItem = jest.fn(({ filter, id }: DeleteItemOptions<TestItem>) => {
  if (
    id !== testItem.id ||
    (filter !== undefined &&
      (filter as any).booleanProperty !== testItem.booleanProperty)
  ) {
    return Promise.reject(new ItemNotFoundError('item', testItem.id));
  }

  return Promise.resolve();
});

describe('@deleteItem', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const service = createInMemoryService({
    deleteItem,
  });

  const { request } = initTests<TestItem>({ service });

  const defaultParams = {
    filter: JSON.stringify({ booleanProperty: testItem.booleanProperty }),
  };

  const defaultOptions = {
    client: request,
    deleteItem,
    params: defaultParams,
    url: `${TEST_URL}/${testItem.id}`,
  };

  it('delete item', async () => {
    await assertOnDeleteItem(defaultOptions);
  });

  it('throws not found error when item does not exist', async () => {
    await assertOnDeleteItem({
      ...defaultOptions,
      status: NOT_FOUND,
      url: `${TEST_URL}/${notExistingId}`,
    });
  });

  it('throws not found error when item does not exist because filter does not match', async () => {
    await assertOnDeleteItem({
      ...defaultOptions,
      params: {
        ...defaultOptions.params,
        filter: JSON.stringify({
          booleanProperty: !testItem.booleanProperty,
        }),
      },
      status: NOT_FOUND,
      url: `${TEST_URL}/${testItem.id}`,
    });
  });

  it('throws not found error when item does not exist and envelope is enabled and pretty is disabled', async () => {
    await assertOnDeleteItem({
      ...defaultOptions,
      params: {
        ...defaultOptions.params,
        envelope: true,
        pretty: false,
      },
      status: OK,
      url: `${TEST_URL}/${notExistingId}`,
    });
  });

  it('delete item when envelope is enabled and pretty response is enabled', async () => {
    await assertOnDeleteItem({
      ...defaultOptions,
      params: {
        ...defaultParams,
        envelope: true,
      },
      status: OK,
    });
  });

  it('delete item when envelope is enabled and pretty response is disabled', async () => {
    await assertOnDeleteItem({
      ...defaultOptions,
      params: {
        ...defaultParams,
        envelope: true,
        pretty: false,
      },
      status: OK,
    });
  });
// tslint:disable-next-line:max-file-line-count
});
