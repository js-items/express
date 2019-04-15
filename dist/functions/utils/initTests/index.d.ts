import { Item } from '@js-items/foundation';
import createSupertest from 'supertest';
import FactoryConfig from '../../../FactoryConfig';
declare const _default: <I extends Item>(factoryOptions: FactoryConfig<I>) => {
    request: createSupertest.SuperTest<createSupertest.Test>;
};
export default _default;
