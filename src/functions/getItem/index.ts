import { Item } from '@js-items/foundation';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import _defaultTo from 'ramda/src/defaultTo';
import FacadeConfig from '../../FacadeConfig';
import RequestHandlerFactory from '../../types/RequestHandlerFactory';
import getJsonQueryParam from '../../utils/getJsonQueryParam';

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

    res.status(OK).json(config.convertItemIntoDocument({ item, req, res }));
  });
};

export default getItem;
