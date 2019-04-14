import { v4 as uuid } from 'uuid';
import TransactionHandler from '../../types/TransactionHandler';
import defaultHandleError from '../defaultHandleError';

const defaultTransactionHandler: TransactionHandler = async ({ req, res }, handler) => {
  const transactionId = uuid();

  try {
    await handler({ transactionId });
  } catch (err) {
    defaultHandleError({ req, res, err, transactionId });
  }
};

export default defaultTransactionHandler;