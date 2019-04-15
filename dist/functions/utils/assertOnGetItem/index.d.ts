import { GetItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import supertest from 'supertest';
declare const assertOnGetItem: <I extends TestItem>({ client, status, params, expectedParams, url, getItem, }: Options<I>) => Promise<void>;
export interface Options<I extends TestItem> {
    readonly client: supertest.SuperTest<supertest.Test>;
    readonly status?: number;
    readonly params?: any;
    readonly expectedParams?: {
        filter: any;
        id: string;
    };
    readonly url: string;
    readonly getItem: GetItem<I>;
}
export default assertOnGetItem;
