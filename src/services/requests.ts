import { request, ResponseBody } from '@tager/admin-services';

import { Command, CommandLog } from '../typings/model';

export function getCommandsList(): Promise<ResponseBody<Array<Command>>> {
  return request.get({ path: '/admin/cron/commands' });
}
export function getCronLogs(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<CommandLog>>> {
  return request.get({ path: '/admin/cron/logs', params });
}
export function getCommandsLogs(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<CommandLog>>> {
  return request.get({ path: '/admin/cron/commands/logs', params });
}

export function executeCommand(
  // payload: CommandExecPayload
  payload: any
): Promise<ResponseBody<{ response: string | null }>> {
  return request.post({ path: '/admin/cron/commands/execute', body: payload });
}
