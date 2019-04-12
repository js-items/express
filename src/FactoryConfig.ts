import { Item } from '@js-items/foundation';
import DocumentIntoItem from './types/DocumentIntoItem';
import CreateFilter from './types/CreateFilter';
import ItemIntoDocument from './types/ItemIntoDocument';
import CreatePatch from './types/CreatePatch';
import Facade from '@js-items/foundation/dist/Facade';
import TransactionHandler from './types/TransactionHandler';
import RequestHandlerFactory from './types/RequestHandlerFactory';

export default interface FactoryConfig<I extends Item> {
  readonly createFilter?: CreateFilter<I>;
  readonly createPatch?: CreatePatch<I>;
  readonly convertDocumentIntoItem?: DocumentIntoItem<I>;
  readonly convertItemIntoDocument?: ItemIntoDocument<I>;
  readonly beforeGetItem?: TransactionHandler;
  readonly getItem?: RequestHandlerFactory;
  readonly beforeUpdateItem?: TransactionHandler;
  readonly updateItem?: RequestHandlerFactory;
  readonly beforeReplaceItem?: TransactionHandler;
  readonly replaceItem?: RequestHandlerFactory;
  readonly beforeDeleteItem?: TransactionHandler;
  readonly deleteItem?: RequestHandlerFactory;
  readonly beforeGetItems?: TransactionHandler;
  readonly getItems?: RequestHandlerFactory;
  readonly beforeCreateItem?: TransactionHandler;
  readonly createItem?: RequestHandlerFactory;
  readonly beforeDeleteItems?: TransactionHandler;
  readonly deleteItems?: RequestHandlerFactory;
  readonly defaultTransactionHandler?: TransactionHandler;
  readonly defaultPaginationLimit?: number;
  readonly service: Facade<I>;
}
