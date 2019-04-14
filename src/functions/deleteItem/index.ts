import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { NO_CONTENT } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import getJsonQueryParam from '../utils/getJsonQueryParam';

const deleteItem: RequestHandlerFactory = <I extends Item>(
  config: FacadeConfig<I>
) => async (req: Request, res: Response) => {
  const transactionHandler = _defaultTo(config.defaultTransactionHandler)(
    config.beforeDeleteItem
  );

  await transactionHandler({ req, res }, async () => {
    const filter = getJsonQueryParam(req.query, 'filter');

    await config.service.deleteItem({
      filter: config.createFilter({ filter, req, res }),
      id: req.params.id,
    });

    res.status(NO_CONTENT).send();
  });
};

export default deleteItem;
