import * as sourceMapSupport from 'source-map-support';
import assertOnDeleteItems from '../utils/assertOnDeleteItems';
import initTests from '../utils/initTests';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { Options as DeleteItemOptions } from '@js-items/foundation/dist/functions/DeleteItems';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { OK } from 'http-status-codes';
import { TEST_URL } from '../../constants';
import createInMemoryService from '../utils/createInMemoryService';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '1'),
}));

const deleteItems = jest.fn((_options: DeleteItemOptions<TestItem>) =>
  Promise.resolve()
);

describe('@deleteItems', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const service = createInMemoryService({
    deleteItems,
  });

  const { request } = initTests<TestItem>({ service });

  const filter = { id: { $in: ['1', '2'] } };

  const defaultParams = {
    filter: JSON.stringify(filter),
  };

  const defaultOptions = {
    client: request,
    deleteItems,
    params: defaultParams,
    url: TEST_URL,
  };

  it('delete items', async () => {
    await assertOnDeleteItems(defaultOptions);
  });

  it('delete items when envelope is enabled and pretty response is enabled', async () => {
    await assertOnDeleteItems({
      ...defaultOptions,
      params: {
        ...defaultParams,
        envelope: true,
      },
      status: OK,
    });
  });

  it('delete items when envelope is enabled and pretty response is disabled', async () => {
    await assertOnDeleteItems({
      ...defaultOptions,
      params: {
        ...defaultParams,
        envelope: true,
        pretty: false,
      },
      status: OK,
    });
  });
});
