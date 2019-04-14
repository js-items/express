import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import CreateFilter from './types/CreateFilter';
import CreatePatch from './types/CreatePatch';
import DocumentIntoItem from './types/DocumentIntoItem';
import ItemIntoDocument from './types/ItemIntoDocument';
import TransactionHandler from './types/TransactionHandler';

export default interface FacadeConfig<I extends Item> {
  readonly totalHeaderName: string;
  readonly beforeHeaderName: string;
  readonly hasAfterHeaderName: string;
  readonly hasBeforeHeaderName: string;
  readonly afterHeaderName: string;
  readonly envelopeParamName: string;
  readonly prettyParamName: string;
  readonly createFilter: CreateFilter<I>;
  readonly createPatch: CreatePatch<I>;
  readonly convertDocumentIntoItem: DocumentIntoItem<I>;
  readonly convertItemIntoDocument: ItemIntoDocument<I>;
  readonly beforeGetItem?: TransactionHandler;
  readonly beforeUpdateItem?: TransactionHandler;
  readonly beforeReplaceItem?: TransactionHandler;
  readonly beforeDeleteItem?: TransactionHandler;
  readonly beforeGetItems?: TransactionHandler;
  readonly beforeCreateItem?: TransactionHandler;
  readonly beforeDeleteItems?: TransactionHandler;
  readonly defaultTransactionHandler: TransactionHandler;
  readonly defaultPaginationLimit: number;
  readonly service: Facade<I>;
}
