// tslint:disable:no-object-literal-type-assertion
import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import {
  Options as CreateItemOptions,
  Result as CreateItemResult,
} from '@js-items/foundation/dist/functions/CreateItem';
import {
  Options as GetItemOptions,
  Result as GetItemResult,
} from '@js-items/foundation/dist/functions/GetItem';
import { Result as GetItemsResult } from '@js-items/foundation/dist/functions/GetItems';
import { Result as ReplaceItemResult } from '@js-items/foundation/dist/functions/ReplaceItem';
import { Result as UpdateItemResult } from '@js-items/foundation/dist/functions/UpdateItem';
import { start } from '@js-items/foundation/dist/interfaces/Cursor';
import FactoryConfig from './FactoryConfig';

const defaultPromise = () => Promise.resolve();
/* istanbul ignore next */
const createInMemoryService = <I extends Item>(
  factoryConfig: FactoryConfig<I>
): Facade<I> => ({
  countItems: () => Promise.resolve({ count: 1 }),
  createItem: ({ item }: CreateItemOptions<I>) =>
    Promise.resolve({ item } as CreateItemResult<I>),
  deleteItem: defaultPromise,
  deleteItems: defaultPromise,
  getItem: ({ id }: GetItemOptions<I>) =>
    Promise.resolve({ item: { id } } as GetItemResult<I>),
  getItems: () =>
    Promise.resolve({
      cursor: {
        after: start,
        before: start,
        hasAfter: false,
        hasBefore: false,
      },
      items: [{ id: '1' }, { id: '2' }],
    } as GetItemsResult<I>),
  replaceItem: () =>
    Promise.resolve({ item: { id: '2' } } as ReplaceItemResult<I>),
  updateItem: () =>
    Promise.resolve({ item: { id: '1' } } as UpdateItemResult<I>),
  ...factoryConfig,
});

export default createInMemoryService;
