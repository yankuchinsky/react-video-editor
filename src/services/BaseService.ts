import { ServicesNames } from './ServicesNames';

export interface IService {
  serviceName: ServicesNames;
}

export abstract class BaseService implements IService {
  protected abstract name: ServicesNames;

  public get serviceName() {
    return this.name;
  }
}
