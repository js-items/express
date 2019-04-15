import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { CREATED } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import sendResponse from '../../utils/sendResponse';

const createItem: RequestHandlerFactory = <I extends Item>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeCreateItem
  );

  await transactionHandler({ req, res }, async () => {
    const { item } = await config.service.createItem({
      id: req.body.id,
      item: config.convertDocumentIntoItem({ document: req.body, req, res }),
    });

    sendResponse({
      config,
      req,
      res,
      responseObject: config.convertItemIntoDocument({ item, req, res }),
      status: CREATED,
    });
  });
};

export default createItem;
