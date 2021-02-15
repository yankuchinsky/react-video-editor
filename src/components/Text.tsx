import { useState, createRef } from 'react';
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
  const el = createRef<HTMLDivElement>();

  const undoFunction = () => {
    commandService.undoCommand();
  };

  keyListenerService.bindActionToKeys(window.document, undoFunction, [
    'Control',
    'z',
  ]);

  const change = (event: any) => {
    const html = el.current?.innerHTML;
    const isUndo = event.nativeEvent.inputType === 'historyUndo';

    if (!html || isUndo) {
      return;
    }

    const execFunc = () => {
      setText(html);
    };

    const undoFunc = (prevState: string) => {
      setText(prevState);
    };

    const command = new Command(execFunc, undoFunc, text.toString());
    commandService.runCommand(command);
  };

  return (
    <div>
      <div
        onInput={change}
        ref={el}
        contentEditable
        style={{ width: '1000px', height: '1000px', border: '1px solid #000' }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <button onClick={undoFunction}>Click</button>
    </div>
  );
};

export default Component;
