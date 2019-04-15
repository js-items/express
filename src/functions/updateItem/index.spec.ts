// tslint:disable:no-any
import * as sourceMapSupport from 'source-map-support';
import assertOnUpdateItem from '../utils/assertOnUpdateItem';
import initTests from '../utils/initTests';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { ItemNotFoundError } from '@js-items/foundation';
import {
  Options as UpdateItemOptions,
  Result as UpdateItemResult,
} from '@js-items/foundation/dist/functions/UpdateItem';
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

const updateItem = jest.fn(
  async ({ patch, id }: UpdateItemOptions<TestItem>) => {
    if (id !== testItem.id) {
      return Promise.reject(new ItemNotFoundError('item', testItem.id));
    }

    // tslint:disable-next-line:no-object-literal-type-assertion
    return Promise.resolve({ item: patch } as UpdateItemResult<TestItem>);
  }
);

describe('@updateItem', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const service = createInMemoryService({
    updateItem,
  });

  const { request } = initTests<TestItem>({ service });

  const expectedParams = {
    filter: {},
    id: testItem.id,
    patch: testItem,
  };

  const defaultOptions = {
    body: testItem,
    client: request,
    expectedParams,
    updateItem,
    url: `${TEST_URL}/${testItem.id}`,
  };

  const notFoundOptions = {
    body: { ...testItem, id: notExistingId },
    expectedParams: {
      ...expectedParams,
      id: notExistingId,
      patch: { ...testItem, id: notExistingId },
    },
  };

  it('throws not found error when item does exist', async () => {
    await assertOnUpdateItem({
      ...defaultOptions,
      ...notFoundOptions,
      status: NOT_FOUND,
      url: `${TEST_URL}/${notExistingId}`,
    });
  });

  it('throws not found error when item does exist and envelope is enabled', async () => {
    await assertOnUpdateItem({
      ...defaultOptions,
      ...notFoundOptions,
      params: {
        envelope: true,
      },
      status: OK,
      url: `${TEST_URL}/${notExistingId}`,
    });
  });

  it('updates item', async () => {
    const updatedItem = {
      booleanProperty: true,
      id: testItem.id,
      numberProperty: 999,
      stringProperty: 'testowo',
    };

    await assertOnUpdateItem({
      ...defaultOptions,
      body: updatedItem,
      expectedParams: {
        ...expectedParams,
        patch: updatedItem,
      },
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
