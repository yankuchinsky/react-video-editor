import { BaseService, IService } from './BaseService';
import { ServicesNames } from './ServicesNames';

export interface ICommandService extends IService {
  runCommand: (Command: Command) => void;
}

export class Command {
  constructor(
    commandToExecute: Function,
    commandToUndo: Function,
    state: string
  ) {
    this.commandToExecute = commandToExecute;
    this.commandToUndo = commandToUndo;
    this.prevState = state;

    // console.log('PREV', this.prevState);
  }

  private prevState: string;

  isDone: Boolean = false;

  private commandToExecute: Function;
  private commandToUndo: Function;

  public execute() {
    this.commandToExecute();

    this.isDone = true;
  }

  public undo() {
    // console.log('DONE', this.prevState);

    this.commandToUndo(this.prevState);
  }
}

export class CommandService extends BaseService implements ICommandService {
  private commandStore: Command[] = [];
  protected name = ServicesNames.CommandService;

  public runCommand(command: Command) {
    this.commandStore.push(command);

    command.execute();
  }

  public undoCommand() {
    const lastCommand = this.commandStore.pop();

    lastCommand?.undo();
  }
}
