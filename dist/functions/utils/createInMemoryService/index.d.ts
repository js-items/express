import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';
import FactoryConfig from './FactoryConfig';
declare const createInMemoryService: <I extends Item>(factoryConfig: FactoryConfig<I>) => Facade<I>;
export default createInMemoryService;
