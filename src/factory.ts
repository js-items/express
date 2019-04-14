import { Item } from '@js-items/foundation';
import { json } from 'body-parser';
import { Router } from 'express';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';
import defaultCreateItem from './functions/createItem';
import defaultDeleteItem from './functions/deleteItem';
import defaultDeleteItems from './functions/deleteItems';
import defaultGetItem from './functions/getItem';
import defaultGetItems from './functions/getItems';
import defaultReplaceItem from './functions/replaceItem';
import defaultUpdateItem from './functions/updateItem';
import defaultTransactionHandler from './utils/defaultTransactionHandler';

export default <I extends Item>({
  deleteItem,
  deleteItems,
  getItem,
  getItems,
  updateItem,
  replaceItem,
  createItem,
  totalHeaderName,
  hasAfterHeaderName,
  afterHeaderName,
  hasBeforeHeaderName,
  beforeHeaderName,
  envelopParamName,
  prettyParamName,
  dataKeyName,
  ...config
}: FactoryConfig<I>): Router => {
  const customTotalHeaderName = _defaultTo('x-total-count')(totalHeaderName);
  const customHasBeforeHeaderName = _defaultTo('x-has-before')(
    hasBeforeHeaderName
  );
  const customBeforeHeaderName = _defaultTo('x-before-cursor')(
    beforeHeaderName
  );
  const customHasAfterHeaderName = _defaultTo('x-has-after')(
    hasAfterHeaderName
  );
  const customAfterHeaderName = _defaultTo('x-after-cursor')(afterHeaderName);
  const customEnvelopParamName = _defaultTo('envelope')(envelopParamName);
  const customPrettyParamName = _defaultTo('pretty')(prettyParamName);
  const customDataKeyName = _defaultTo('data', dataKeyName);
  
  const facadeConfig: FacadeConfig<I> = {
    afterHeaderName: customAfterHeaderName,
    beforeHeaderName: customBeforeHeaderName,
    convertDocumentIntoItem: ({ document }) => document,
    convertItemIntoDocument: ({ item }) => item,
    createFilter: ({ filter }) => filter,
    createPatch: ({ document }) => document,
    dataKeyName: customDataKeyName,
    defaultPaginationLimit: 10,
    defaultTransactionHandler,
    envelopeParamName: customEnvelopParamName,
    hasAfterHeaderName: customHasAfterHeaderName,
    hasBeforeHeaderName: customHasBeforeHeaderName,
    prettyParamName: customPrettyParamName,
    totalHeaderName: customTotalHeaderName,
    ...config,
  };

  const router = Router();
  const bodyParserEnabled = _defaultTo(true)(config.enableJsonBodyParser);

  if (bodyParserEnabled) {
    router.use(json());
  }

  const deleteItemFactory = _defaultTo(defaultDeleteItem)(deleteItem);
  const getItemFactory = _defaultTo(defaultGetItem)(getItem);
  const updateItemFactory = _defaultTo(defaultUpdateItem)(updateItem);
  const replaceItemFactory = _defaultTo(defaultReplaceItem)(replaceItem);
  const deleteItemsFactory = _defaultTo(defaultDeleteItems)(deleteItems);
  const getItemsFactory = _defaultTo(defaultGetItems)(getItems);
  const createItemFactory = _defaultTo(defaultCreateItem)(createItem);

  router.delete('/:id', deleteItemFactory(facadeConfig));
  router.get('/:id', getItemFactory(facadeConfig));
  router.patch('/:id', updateItemFactory(facadeConfig));
  router.put('/:id', replaceItemFactory(facadeConfig));
  router.delete('', deleteItemsFactory(facadeConfig));
  router.get('', getItemsFactory(facadeConfig));
  router.post('', createItemFactory(facadeConfig));

  return router;
};
