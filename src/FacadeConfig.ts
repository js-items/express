import { Item } from '@js-items/foundation';
import Facade from '@js-items/foundation/dist/Facade';

// tslint:disable-next-line:no-empty-interface
export default interface FacadeConfig<I extends Item> {
  readonly service: Facade<I>;
}
