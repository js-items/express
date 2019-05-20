import { Item, Sort } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import CreateFilter from './types/CreateFilter';
import CreatePatch from './types/CreatePatch';
import DocumentIntoItem from './types/DocumentIntoItem';
import ItemIntoDocument from './types/ItemIntoDocument';
import RequestHandlerFactory from './types/RequestHandlerFactory';
import TransactionHandler from './types/TransactionHandler';

export default interface FactoryConfig<I extends Item> {
  readonly dataKeyName?: string;
  readonly defaultSort?: Sort<I>;
  readonly enableJsonBodyParser?: boolean;
  readonly serverSideGeneratedIds?: boolean;
  readonly totalHeaderName?: string;
  readonly hasAfterHeaderName?: string;
  readonly afterHeaderName?: string;
  readonly hasBeforeHeaderName?: string;
  readonly beforeHeaderName?: string;
  readonly afterKey?: string;
  readonly beforeKey?: string;
  readonly hasBeforeKey?: string;
  readonly hasAfterKey?: string;
  readonly totalKey?: string;
  readonly paginationKey?: string;
  readonly envelopParamName?: string;
  readonly prettyParamName?: string;
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
