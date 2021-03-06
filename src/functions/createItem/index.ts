import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { CREATED } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import { v4 as uuid } from 'uuid';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import sendResponse from '../../utils/sendResponse';

const createItem: RequestHandlerFactory = <I extends Item>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeCreateItem
  );

  const id = config.serverSideGeneratedIds ? uuid() : req.body.id;

  await transactionHandler({ req, res }, async () => {
    const { item } = await config.service.createItem({
      id,
      item: config.convertDocumentIntoItem({
        document: { ...req.body, id },
        req,
        res,
      }),
    });
    
    req.body.id = id;

    sendResponse({
      body: config.convertItemIntoDocument({ item, req, res }),
      config,
      req,
      res,
      status: CREATED,
    });
  });
};

export default createItem;
