import { DeleteItems } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import supertest from 'supertest';
declare const assertOnDeleteItems: <I extends TestItem>({ client, status, params, expectedParams, url, deleteItems, }: Options<I>) => Promise<void>;
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
    readonly deleteItems: DeleteItems<I>;
}
export default assertOnDeleteItems;
