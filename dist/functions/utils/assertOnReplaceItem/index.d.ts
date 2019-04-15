import { ReplaceItem } from '@js-items/foundation';
import { TestItem } from '@js-items/foundation/dist/functions/utils/testItem';
import supertest from 'supertest';
declare const assertOnReplaceItem: <I extends TestItem>({ client, status, params, body, expectedParams, url, replaceItem, }: Options<I>) => Promise<void>;
export interface Options<I extends TestItem> {
    readonly client: supertest.SuperTest<supertest.Test>;
    readonly status?: number;
    readonly params?: any;
    readonly body?: any;
    readonly expectedParams?: {
        item: any;
        id: string;
    };
    readonly url: string;
    readonly replaceItem: ReplaceItem<I>;
}
export default assertOnReplaceItem;
