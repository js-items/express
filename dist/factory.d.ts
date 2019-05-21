import { Item } from '@js-items/foundation';
import { Router } from 'express';
import FactoryConfig from './FactoryConfig';
declare const _default: <I extends Item>({ deleteItem, deleteItems, getItem, getItems, updateItem, replaceItem, createItem, totalHeaderName, hasAfterHeaderName, defaultSort, afterHeaderName, hasBeforeHeaderName, beforeHeaderName, afterKey, beforeKey, hasBeforeKey, hasAfterKey, totalKey, paginationKey, envelopParamName, prettyParamName, dataKeyName, serverSideGeneratedIds, ...config }: FactoryConfig<I>) => Router;
export default _default;
