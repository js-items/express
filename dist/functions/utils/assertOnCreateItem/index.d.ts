import { CreateItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import supertest from 'supertest';
declare const assertOnCreateItem: <I extends TestItem>({ client, status, params, expectedParams, url, body, createItem, }: Options<I>) => Promise<void>;
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
