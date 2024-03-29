import { type RouteRecordRaw } from 'vue-router';

import {
  getCronDetailsUrlRaw,
  getCommandLogDetailsUrlRaw,
  getCommandExecuteUrl,
  getCommandsListUrl,
  getCommandsLogsUrl,
  getCronLogsUrl,
} from '../utils/paths';
import CommandLogs from '../views/CommandsLogs';
import CommandLogDetails from '../views/CommandsLogsDetails';
import CronLogs from '../views/CronLogs';
import CommandsList from '../views/CommandsList';
import CronDetails from '../views/CronLogsDetails';
import CommandExecute from '../views/CommandsExecute';

import { PAGES_ROUTE_PATHS } from './paths';

export const PAGE_COMMANDS_LOGS_ROUTE: RouteRecordRaw = {
  path: getCommandsLogsUrl(),
  component: CommandLogs,
  name: 'Commands Logs',
  meta: {
    getBreadcrumbs: (route, { t }) => [
      { url: '/', text: t('cron:home') },
      { url: route.path, text: t('cron:commandsLogs') },
    ],
  },
};

export const PAGE_COMMANDS_LOG_DETAILS_ROUTE: RouteRecordRaw = {
  path: getCommandLogDetailsUrlRaw(),
  component: CommandLogDetails,
  name: 'Commands Logs Details',
  meta: {
    getBreadcrumbs: (route, { t }) => [
      { url: '/', text: t('cron:home') },
      { url: PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS, text: t('cron:cronLogs') },
      { url: route.path, text: t('cron:commandLogDetails') },
    ],
  },
};

export const PAGE_CRON_LOGS_ROUTE: RouteRecordRaw = {
  path: getCronLogsUrl(),
  component: CronLogs,
  name: 'Cron Logs',
  meta: {
    getBreadcrumbs: (route, { t }) => [
      { url: '/', text: t('cron:home') },
      { url: route.path, text: t('cron:cronLogs') },
    ],
  },
};

export const PAGE_CRON_LOG_DETAILS_ROUTE: RouteRecordRaw = {
  path: getCronDetailsUrlRaw(),
  component: CronDetails,
  name: 'Cron Details',
  meta: {
    getBreadcrumbs: (route, { t }) => [
      { url: '/', text: t('cron:home') },
      { url: PAGES_ROUTE_PATHS.PAGE_CRON_LOGS, text: t('cron:cronLogs') },
      { url: route.path, text: t('cron:cronLogDetails') },
    ],
  },
};

export const PAGE_COMMANDS_ROUTE: RouteRecordRaw = {
  path: getCommandsListUrl(),
  component: CommandsList,
  name: 'Page Commands',
  meta: {
    getBreadcrumbs: (route, { t }) => [
      { url: '/', text: t('cron:home') },
      { url: route.path, text: t('cron:commands') },
    ],
  },
};

export const PAGE_COMMANDS_DETAILS_ROUTE: RouteRecordRaw = {
  path: getCommandExecuteUrl(),
  component: CommandExecute,
  name: 'Commands Execute',
  meta: {
    getBreadcrumbs: (route, { t }) => [
      { url: '/', text: t('cron:home') },
      { url: PAGES_ROUTE_PATHS.PAGE_COMMANDS, text: t('cron:commands') },
      { url: route.path, text: t('cron:commandExecute') },
    ],
  },
};
