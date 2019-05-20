import { Item } from '@js-items/foundation';
import boolean from 'boolean';
import { Request, Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { OK } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import _isNil from 'ramda/src/isNil';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import getJsonQueryParam from '../../utils/getJsonQueryParam';
import getNumberQueryParam from '../../utils/getNumberQueryParam';
import sendResponse from '../../utils/sendResponse';

const getItems: RequestHandlerFactory = <I extends Item>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeGetItems
  );

  await transactionHandler({ req, res }, async () => {
    const filter = getJsonQueryParam(req.query, 'filter');

    const sort = !_isNil(req.query.sort)
      ? getJsonQueryParam(req.query, 'sort')
      : config.defaultSort;
      
    const limit = getNumberQueryParam(
      req.query,
      'limit',
      config.defaultPaginationLimit
    );
    
    const createdFilter = config.createFilter({ filter, req, res });

    const { cursor, items } = await config.service.getItems({
      filter: createdFilter,
      pagination: {
        after: req.query.after,
        before: req.query.before,
        limit,
      },
      sort,
    });

    const { count: totalCount } = await config.service.countItems({
      filter: createdFilter,
    });

    const responseHeaders: OutgoingHttpHeaders = {
      [config.afterHeaderName]: cursor.after,
      [config.beforeHeaderName]: cursor.before,
      [config.hasBeforeHeaderName]: cursor.hasBefore.toString(),
      [config.hasAfterHeaderName]: cursor.hasAfter.toString(),
      [config.totalHeaderName]: totalCount,
    };

    const responseData = items.map(item =>
      config.convertItemIntoDocument({ item, req, res })
    );

    const nestedObject = {
      [config.paginationKey]: {
        [config.afterKey]: cursor.after,
        [config.beforeKey]: cursor.before,
        [config.hasBeforeKey]: cursor.hasBefore,
        [config.hasAfterKey]: cursor.hasAfter,
        [config.totalKey]: totalCount,
      },
      [config.dataKeyName]: responseData,
    };

    const enveloped = boolean(req.query[config.envelopeParamName]);

    const responseObject = enveloped ? nestedObject : responseData;
    const headers = enveloped ? {} : responseHeaders;

    sendResponse({ req, res, config, status: OK, headers, responseObject });
  });
};

export default getItems;
