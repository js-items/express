// tslint:disable:no-any
import { UpdateItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { OK } from 'http-status-codes';
import supertest from 'supertest';
import createTestUrl from '../createTestUrl';

const assertOnUpdateItem = async <I extends TestItem>({
  client,
  status = OK,
  params,
  body,
  expectedParams,
  url,
  updateItem,
}: Options<I>) => {
  const requestUrl =
    params !== undefined ? createTestUrl({ url, params }) : url;

  const result = await client.patch(requestUrl).send(body);

  expect(result.status).toBe(status);
  expect(result.body).toMatchSnapshot();

  if (expectedParams !== undefined) {
    expect(updateItem).toBeCalledWith(expectedParams);
  }
};

export interface Options<I extends TestItem> {
  readonly client: supertest.SuperTest<supertest.Test>;
  readonly status?: number;
  readonly params?: any;
  readonly body?: any;
  readonly expectedParams?: any;
  readonly url: string;
  readonly updateItem: UpdateItem<I>;
}

export default assertOnUpdateItem;
