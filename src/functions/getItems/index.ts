import { Item, PaginatedResponse } from '@js-items/foundation';
import { Request, Response } from 'express';
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
      : /* istanbul ignore next */ config.defaultSort;

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

    let totalCount;

    if (config.service.countItems !== undefined) {
      const { count } = await config.service.countItems({
        filter: createdFilter,
      });

      totalCount = count;
    }

    const data: I[] = items.map(item =>
      config.convertItemIntoDocument({ item, req, res })
    );

    // TODO: check other handlers for aligning responses
    const body: PaginatedResponse<I> = {
      data,
      pagination: {
        after: _defaultTo(null)(cursor.after),
        before: _defaultTo(null)(cursor.before),
        hasAfter: cursor.hasAfter,
        hasBefore: cursor.hasBefore,
        totalCount: totalCount !== undefined ? totalCount : 0,
      },
    };

    sendResponse({ req, res, config, body });
  });
};

export default getItems;
