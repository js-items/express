import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import getJsonQueryParam from '../../utils/getJsonQueryParam';
import sendResponse from '../../utils/sendResponse';

const getItem: RequestHandlerFactory = <I extends Item>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeGetItem
  );

  await transactionHandler({ req, res }, async () => {
    const filter = getJsonQueryParam(req.query, 'filter');

    const { item } = await config.service.getItem({
      filter: config.createFilter({ filter, req, res }),
      id: req.params.id,
    });
    
    sendResponse({
      body: config.convertItemIntoDocument({ item, req, res }),
      config,
      req,
      res,
    });
  });
};

export default getItem;
