// tslint:disable:no-any
import { ReplaceItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import { OK } from 'http-status-codes';
import supertest from 'supertest';
import createTestUrl from '../createTestUrl';

const assertOnReplaceItem = async <I extends TestItem>({
  client,
  status = OK,
  params,
  body,
  expectedParams,
  url,
  replaceItem,
}: Options<I>) => {
  const requestUrl =
    params !== undefined ? createTestUrl({ url, params }) : url;

  const result = await client.put(requestUrl).send(body);

  expect(result.status).toBe(status);
  expect(result.body).toMatchSnapshot();

  if (expectedParams !== undefined) {
    expect(replaceItem).toBeCalledWith(expectedParams);
  }
};

export interface Options<I extends TestItem> {
  readonly client: supertest.SuperTest<supertest.Test>;
  readonly status?: number;
  readonly params?: any;
  readonly body?: any;
  readonly expectedParams?: { item: any; id: string };
  readonly url: string;
  readonly replaceItem: ReplaceItem<I>;
}

export default assertOnReplaceItem;
