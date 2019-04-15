// tslint:disable:no-any
import { CreateItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { CREATED } from 'http-status-codes';
import supertest from 'supertest';
import createTestUrl from '../createTestUrl';

const assertOnCreateItem = async <I extends TestItem>({
  client,
  status = CREATED,
  params,
  expectedParams,
  url,
  body,
  createItem,
}: Options<I>) => {
  const requestUrl =
    params !== undefined ? createTestUrl({ url, params }) : url;
  const result = await client.post(requestUrl).send(body);

  expect(result.status).toBe(status);
  expect(result.body).toMatchSnapshot();
  
  if (expectedParams !== undefined) {
    expect(createItem).toBeCalledWith(expectedParams);
  }
};

export interface Options<I extends TestItem> {
  readonly client: supertest.SuperTest<supertest.Test>;
  readonly status?: number;
  readonly params?: any;
  readonly body?: any;
  readonly expectedParams?: any;
  readonly url: string;
  readonly createItem: CreateItem<I>;
}

export default assertOnCreateItem;
