// tslint:disable:no-object-literal-type-assertion
import * as sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { ItemNotFoundError } from '@js-items/foundation';
import { Result as GetItemResult } from '@js-items/foundation/dist/functions/GetItem';
import testItem, {
  TestItem,
} from '@js-items/foundation/dist/functions/utils/testItem';
import { NOT_FOUND } from 'http-status-codes';
import { TEST_URL } from '../../constants';
import assertOnGetItem from '../utils/assertOnGetItem';
import createInMemoryService from '../utils/createInMemoryService';
import initTests from '../utils/initTests';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

const notExistingId = 'not-existing-id';

const getItem = jest.fn(({ id, filter }) => {
  if (
    id !== testItem.id ||
    filter.booleanProperty !== testItem.booleanProperty
  ) {
    return Promise.reject(new ItemNotFoundError('item', testItem.id));
  }

  return Promise.resolve({
    item: testItem,
  } as GetItemResult<TestItem>);
});

const service = createInMemoryService({
  getItem,
});

const { request } = initTests<TestItem>({ service });

const url = `${TEST_URL}/${notExistingId}`;

const defaultOptions = {
  client: request,
  getItem,
  url,
};

describe('@getItem', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('throws error when item not found', async () => {
    await assertOnGetItem({
      ...defaultOptions,
      status: NOT_FOUND,
    });
  });

  it('throws error when item id exists but filter does not match', async () => {
    await assertOnGetItem({
      ...defaultOptions,
      expectedParams: {
        filter: {
          booleanProperty: !testItem.booleanProperty,
        },
        id: notExistingId,
      },
      params: {
        filter: JSON.stringify({
          booleanProperty: !testItem.booleanProperty,
        }),
      },
      status: NOT_FOUND,
    });
  });

  it('get item when envelope is enabled and pretty response is disabled', async () => {
    await assertOnGetItem({
      ...defaultOptions,
      expectedParams: {
        filter: {
          booleanProperty: testItem.booleanProperty,
        },
        id: testItem.id,
      },
      params: {
        envelope: true,
        filter: JSON.stringify({
          booleanProperty: testItem.booleanProperty,
        }),
        pretty: false,
      },
      url: `${TEST_URL}/${testItem.id}`,
    });
  });

  it('successfuly get item', async () => {
    await assertOnGetItem({
      ...defaultOptions,
      expectedParams: {
        filter: {
          booleanProperty: testItem.booleanProperty,
        },
        id: testItem.id,
      },
      params: {
        filter: JSON.stringify({
          booleanProperty: testItem.booleanProperty,
        }),
      },
      url: `${TEST_URL}/${testItem.id}`,
    });
  });
  // tslint:disable-next-line:max-file-line-count
});
