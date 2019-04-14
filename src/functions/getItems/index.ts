import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { OutgoingHttpHeaders } from 'http';
import { OK } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
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
    const count = Boolean(req.query.count);
    const sort = getJsonQueryParam(req.query, 'sort');
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

    const headers: OutgoingHttpHeaders = {
      [config.afterHeaderName]: cursor.after,
      [config.beforeHeaderName]: cursor.before,
      [config.hasBeforeHeaderName]: cursor.hasBefore.toString(),
      [config.hasAfterHeaderName]: cursor.hasAfter.toString(),
    };

    if (count) {
      const { count: totalCount } = await config.service.countItems({
        filter: createdFilter,
      });

      headers[config.totalHeaderName] = totalCount;
    }

    const responseObject = {
      [config.dataKeyName]: items.map(item =>
        config.convertItemIntoDocument({ item, req, res })
      ),
    };

    sendResponse({ req, res, config, status: OK, headers, responseObject });
  });
};

export default getItems;
