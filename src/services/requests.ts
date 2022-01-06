import { request, ResponseBody } from '@tager/admin-services';

import {
  Command,
  CommandLog,
  CronCommand,
  CronLog,
  CronLogShort,
} from '../typings/model';

export function getCommandsList(
  query?: string
): Promise<ResponseBody<Array<Command>>> {
  return request.get({
    path: '/admin/cron/commands',
    params: {
      query,
    },
  });
}

export function getCommandDetails(
  signature: string
): Promise<ResponseBody<Command>> {
  return request.get({ path: `/admin/cron/commands/${signature}` });
}

export function getCronCommandsList(): Promise<
  ResponseBody<Array<CronCommand>>
> {
  return request.get({ path: '/admin/cron/logs/commands' });
}

export function getCronLogs(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<CronLogShort>>> {
  return request.get({ path: '/admin/cron/logs', params });
}

export function getCronLogDetails(id: number): Promise<ResponseBody<CronLog>> {
  return request.get({ path: `/admin/cron/logs/${id}` });
}

export function getCommandsLogs(params?: {
  query?: string;
  pageNumber?: number;
  pageSize?: number;
}): Promise<ResponseBody<Array<CommandLog>>> {
  return request.get({ path: '/admin/cron/commands/logs', params });
}

export function getCommandLogDetails(
  id: number
): Promise<ResponseBody<CommandLog>> {
  return request.get({ path: `/admin/cron/commands/logs/${id}` });
}

export function executeCommand(
  payload: any
): Promise<ResponseBody<{ response: string | null }>> {
  return request.post({ path: '/admin/cron/commands/execute', body: payload });
}
