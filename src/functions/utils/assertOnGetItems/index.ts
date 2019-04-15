// tslint:disable:no-any
import { GetItems } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { OK } from 'http-status-codes';
import supertest from 'supertest';
import createTestUrl from '../../utils/createTestUrl';

const assertOnGetItems = async <I extends TestItem>({
  client,
  status = OK,
  params,
  expectedParams,
  url,
  getItems,
}: Options<I>) => {
  const requestUrl =
    params !== undefined ? createTestUrl({ url, params }) : url;
  const result = await client.get(requestUrl).send();

  expect(result.status).toBe(status);
  expect(result.body).toMatchSnapshot();
  
  if (expectedParams !== undefined) {
    expect(getItems).toBeCalledWith(expectedParams);
  }
};

export interface Options<I extends TestItem> {
  readonly client: supertest.SuperTest<supertest.Test>;
  readonly status?: number;
  readonly params?: any;
  readonly expectedParams?: { filter: any; pagination: any; sort: any };
  readonly url: string;
  readonly getItems: GetItems<I>;
}

export default assertOnGetItems;
