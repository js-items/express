import { ConflictingItemError, ItemNotFoundError } from '@js-items/foundation';

import {
  BAD_REQUEST,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from 'http-status-codes';
import JsonError from '../../errors/JsonError';
import NumberError from '../../errors/NumberError';
import ErrorHandler from '../../types/ErrorHandler';
import sendResponse from '../sendResponse';

const handleError: ErrorHandler = ({ req, res, err, transactionId }) => {
  const sendErrorResponse = (statusCode: number, errorData: object) => {
    const data = {
      ...errorData,
      transactionId,
    };
    
    sendResponse({
      body: data,
      req,
      res,
      status: statusCode,
    });
  };

  if (err instanceof ConflictingItemError) {
    sendErrorResponse(CONFLICT, {
      itemId: err.itemId,
      itemName: err.itemName,
    });

    return;
  }

  if (err instanceof ItemNotFoundError) {
    sendErrorResponse(NOT_FOUND, {
      itemId: err.itemId,
      itemName: err.itemName,
    });

    return;
  }

  if (err instanceof JsonError) {
    sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });

    return;
  }

  if (err instanceof NumberError) {
    sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });

    return;
  }

  sendErrorResponse(INTERNAL_SERVER_ERROR, {});
};

export default handleError;
