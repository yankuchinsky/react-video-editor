import { useState } from 'react';
import { ServicesNames } from '../services/ServicesNames';
import { CommandService, Command } from '../services/CommandService';
import { IKeyListenerService } from '../services/KeyListenerService';
import { ServicesContainer } from '../services/ServicesContainer';

const Component = () => {
  const services = ServicesContainer.getInstance();

  const commandService = services.getService(
    ServicesNames.CommandService
  ) as CommandService;

  const keyListenerService = services.getService(
    ServicesNames.KeyListenerService
  ) as IKeyListenerService;

  const [text, setText] = useState<string>('');

  const undoFunction = () => {
    commandService.undoCommand();
  };

  keyListenerService.bindActionToKeys(window.document, undoFunction, [
    'Control',
    'z',
  ]);

  const change = (event: any) => {
    if (!event.target.value) {
      return;
    }

    const { value } = event.target;

    const execFunc = () => {
      setText(value);
    };

    const undoFunc = (prevState: string) => {
      setText(prevState);
    };

    const command = new Command(execFunc, undoFunc, text);
    commandService.runCommand(command);
  };

  return (
    <div>
      <textarea onChange={change} value={text}></textarea>
      <textarea></textarea>
      <button onClick={undoFunction}>Click</button>
    </div>
  );
};

export default Component;
