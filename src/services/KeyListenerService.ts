import { BaseService, IService } from './BaseService';
import { ServicesNames } from '../services/ServicesNames';

type PressedKeys = {
  [s in string]: boolean;
};

export interface IKeyListenerService extends IService {
  bindActionToKeys: Function;
}

export class KeyListenerService
  extends BaseService
  implements IKeyListenerService {
  name = ServicesNames.KeyListenerService;

  private isPressed = false;

  private timeout = 500;

  private timeoutCallback: any;

  public bindActionToKeys(context: Document, func: Function, keys: string[]) {
    const pressedKeys: PressedKeys = {};

    keys.forEach((key: string) => (pressedKeys[key] = false));

    const tryToExec = () => {
      if (this.isPressed) {
        return;
      }

      if (Object.keys(pressedKeys).every((key: string) => !!pressedKeys[key])) {
        this.isPressed = true;
        func();
      }

      this.timeoutCallback = setTimeout(() => {
        this.isPressed = false;
      }, this.timeout);
    };

    context.addEventListener('keydown', (event: KeyboardEvent) => {
      const { key } = event;

      if (keys.indexOf(key) === -1) {
        return;
      }

      pressedKeys[key] = true;
      tryToExec();
    });

    context.addEventListener('keyup', (event: KeyboardEvent) => {
      const { key } = event;

      if (keys.indexOf(key) === -1) {
        return;
      }

      this.isPressed = false;
      window.clearTimeout(this.timeoutCallback);

      pressedKeys[key] = false;
    });
  }
}
