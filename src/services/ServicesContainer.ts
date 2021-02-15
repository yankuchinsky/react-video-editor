import { IService } from './BaseService';
import { ServicesNames } from './ServicesNames';

export class ServicesContainer {
  private static instance: ServicesContainer;
  private serviceStore: IService[] = [];

  getService(serviceName: ServicesNames) {
    return this.serviceStore.find(
      (service: IService) => service.serviceName === serviceName
    );
  }

  addService(service: IService) {
    this.serviceStore.push(service);
  }

  public static getInstance(): ServicesContainer {
    if (!this.instance) {
      this.instance = new ServicesContainer();
    }

    return this.instance;
  }
}
