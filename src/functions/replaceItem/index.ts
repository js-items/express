import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import getJsonQueryParam from '../../utils/getJsonQueryParam';
import sendResponse from '../../utils/sendResponse';

const replaceItem: RequestHandlerFactory =  <I extends Item>(config: FacadeConfig<I>) => async (
  req: Request,
  res: Response
) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(config.beforeReplaceItem);

  await transactionHandler({ req, res }, async () => {
    const filter = getJsonQueryParam(req.query, 'filter');

    const result = await config.service.replaceItem({
      filter: config.createFilter({ filter, req, res }),
      id: req.params.id,
      item: config.convertDocumentIntoItem({ document: req.body, req, res }),
    });

    sendResponse({
      config,
      req,
      res,
      responseObject: config.convertItemIntoDocument({ item: result.item, req, res }),
      status: OK,
    });
  });
};

export default replaceItem;