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
    const body = {
      ...errorData,
      transactionId,
    };

    sendResponse({
      req,
      res,
      responseObject: body,
      status: statusCode,
    });
  };

  if (err instanceof ConflictingItemError) {
    return sendErrorResponse(CONFLICT, {
      itemId: err.itemId,
      itemName: err.itemName,
    });
  }

  if (err instanceof ItemNotFoundError) {
    return sendErrorResponse(NOT_FOUND, {
      itemId: err.itemId,
      itemName: err.itemName,
    });
  }

  if (err instanceof JsonError) {
    return sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });
  }

  if (err instanceof NumberError) {
    return sendErrorResponse(BAD_REQUEST, {
      data: err.data,
      path: err.path,
    });
  }

  return sendErrorResponse(INTERNAL_SERVER_ERROR, {});
};

export default handleError;
