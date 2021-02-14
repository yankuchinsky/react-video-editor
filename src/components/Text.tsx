import { useState } from 'react';
import { ServicesNames } from '../services/BaseService';
import { CommandService, Command } from '../services/CommandService';
import { ServicesContainer } from '../services/ServicesContainer';

const Component = () => {
  const services = ServicesContainer.getInstance();

  const commandService = services.getService(
    ServicesNames.CommandService
  ) as CommandService;

  const [text, setText] = useState<string>('');

  const func = () => {
    commandService.undoCommand();
  };

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
      <button onClick={func}>Click</button>
    </div>
  );
};

export default Component;
