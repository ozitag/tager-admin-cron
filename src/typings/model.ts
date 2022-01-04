export interface CommandLogShort {
  readonly id: number;
  readonly signature: string;
  readonly status: string;
  readonly created_at: string;
  readonly arguments: object;
  readonly hasoutput: boolean;
  readonly user: null | {
    id: number;
    name: string;
  };
}
export interface CommandLog extends CommandLogShort {
  readonly output: string | null;
}

export interface CronLogShort {
  readonly id: number;
  readonly command: string;
  readonly status: string;
  readonly begin_at: string;
  readonly end_at: string;
  readonly arguments: object;
  readonly hasoutput: boolean;
  readonly haserror: boolean;
  readonly user: null | {
    id: number;
    name: string;
  };
}
export interface CronLog extends CronLogShort {
  readonly error: string | null;
  readonly output: string | null;
  readonly class: string;
}

export interface Command {
  readonly signature: string;
  readonly description: string | null;
  readonly arguments: Array<CommandArgument>;
}

interface CommandArgument {
  readonly name: string;
  readonly default: string | null;
  readonly values: Array<string>;
  readonly method: string | null;
  readonly description: string | null;
}
