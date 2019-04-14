import {
  CountItems,
  CreateItem,
  DeleteItem,
  DeleteItems,
  GetItem,
  GetItems,
  Item,
  ReplaceItem,
  UpdateItem,
} from '@js-items/foundation';

export default interface FactoryConfig<I extends Item> {
  readonly countItems?: CountItems<I>;
  readonly createItem?: CreateItem<I>;
  readonly updateItem?: UpdateItem<I>;
  readonly replaceItem?: ReplaceItem<I>;
  readonly deleteItem?: DeleteItem<I>;
  readonly deleteItems?: DeleteItems<I>;
  readonly getItem?: GetItem<I>;
  readonly getItems?: GetItems<I>;
}
