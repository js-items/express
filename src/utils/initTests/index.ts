import * as sourceMapSupport from 'source-map-support';
import { TEST_URL } from '../../constants';
sourceMapSupport.install();
import dotenv from 'dotenv';
dotenv.config();
import { Item } from '@js-items/foundation';
import express from 'express';
import createSupertest from 'supertest';
import itemsFactory from '../../factory';
import FactoryConfig from '../../FactoryConfig';

export default <I extends Item>(factoryOptions: FactoryConfig<I>) => {
  const app: express.Application = express();

  app.use(TEST_URL, itemsFactory(factoryOptions));

  const request = createSupertest(app);

  return { request };
};
