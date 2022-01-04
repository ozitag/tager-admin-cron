import { compile } from 'path-to-regexp';

import { PAGES_ROUTE_PATHS } from '../constants/paths';

export function getCommandsListUrl(): string {
  return PAGES_ROUTE_PATHS.PAGE_COMMANDS;
}

export function getCronLogsUrl(): string {
  return PAGES_ROUTE_PATHS.PAGE_CRON_LOGS;
}

export function getCronDetailsUrl(id: number) {
  return compile(PAGES_ROUTE_PATHS.PAGE_CRON_LOGS_DETAILS)({ id });
}

export function getCronDetailsUrlRaw() {
  return PAGES_ROUTE_PATHS.PAGE_CRON_LOGS_DETAILS;
}

export function getCommandsLogsUrl(): string {
  return PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS;
}

export function getCommandDetailsUrl(id: number) {
  return compile(PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS_DETAILS)({ id });
}

export function getCommandDetailsUrlRaw() {
  return PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS_DETAILS;
}
