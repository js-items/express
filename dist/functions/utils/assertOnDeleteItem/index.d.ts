import { DeleteItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import supertest from 'supertest';
declare const assertOnDeleteItem: <I extends TestItem>({ client, status, params, expectedParams, url, deleteItem, }: Options<I>) => Promise<void>;
export interface Options<I extends TestItem> {
    readonly client: supertest.SuperTest<supertest.Test>;
    readonly status?: number;
    readonly params?: any;
    readonly expectedParams?: {
        filter: any;
        pagination: any;
        sort: any;
    };
    readonly url: string;
    readonly deleteItem: DeleteItem<I>;
}
export default assertOnDeleteItem;
