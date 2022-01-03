export interface CommandLog {
  readonly signature: string;
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
