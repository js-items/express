import { UpdateItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import supertest from 'supertest';
declare const assertOnUpdateItem: <I extends TestItem>({ client, status, params, body, expectedParams, url, updateItem, }: Options<I>) => Promise<void>;
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
