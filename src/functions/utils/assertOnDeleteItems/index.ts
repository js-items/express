// tslint:disable:no-any
import { DeleteItems } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { NO_CONTENT } from 'http-status-codes';
import supertest from 'supertest';
import createTestUrl from '../createTestUrl';

const assertOnDeleteItems = async <I extends TestItem>({
  client,
  status = NO_CONTENT,
  params,
  expectedParams,
  url,
  deleteItems,
}: Options<I>) => {
  const requestUrl =
    params !== undefined ? createTestUrl({ url, params }) : url;
  const result = await client.delete(requestUrl).send();

  expect(result.status).toBe(status);
  expect(result.body).toMatchSnapshot();
  
  if (expectedParams !== undefined) {
    expect(deleteItems).toBeCalledWith(expectedParams);
  }
};

export interface Options<I extends TestItem> {
  readonly client: supertest.SuperTest<supertest.Test>;
  readonly status?: number;
  readonly params?: any;
  readonly expectedParams?: { filter: any; pagination: any; sort: any };
  readonly url: string;
  readonly deleteItems: DeleteItems<I>;
}

export default assertOnDeleteItems;
