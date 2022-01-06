import { CustomRouteConfig } from '@tager/admin-layout';

import {
  getCronDetailsUrlRaw,
  getCommandLogDetailsUrlRaw,
  getCommandDetailsUrlRaw,
  getCommandsListUrl,
  getCommandsLogsUrl,
  getCronLogsUrl,
} from '../utils/paths';
import CommandLogs from '../views/Commands/Logs';
import CommandLogDetails from '../views/Commands/LogDetails';
import CronLogs from '../views/CronCommands/Logs';
import CommandList from '../views/Commands/List';
import CronDetails from '../views/CronCommands/Details';
import CommandDetails from '../views/Commands/Details';

import { PAGES_ROUTE_PATHS } from './paths';

export const PAGE_COMMANDS_LOGS_ROUTE: CustomRouteConfig = {
  path: getCommandsLogsUrl(),
  component: CommandLogs,
  name: 'Commands Logs',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: route.path, text: t('pages:commandsLogs') },
    ],
  },
};

export const PAGE_COMMANDS_LOG_DETAILS_ROUTE: CustomRouteConfig = {
  path: getCommandLogDetailsUrlRaw(),
  component: CommandLogDetails,
  name: 'Commands Logs',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS, text: t('pages:cronLogs') },
      { url: route.path, text: t('pages:commandLogDetails') },
    ],
  },
};

export const PAGE_CRON_LOGS_ROUTE: CustomRouteConfig = {
  path: getCronLogsUrl(),
  component: CronLogs,
  name: 'Cron Logs',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: route.path, text: t('pages:cronLogs') },
    ],
  },
};

export const PAGE_CRON_LOG_DETAILS_ROUTE: CustomRouteConfig = {
  path: getCronDetailsUrlRaw(),
  component: CronDetails,
  name: 'Cron Details',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: PAGES_ROUTE_PATHS.PAGE_CRON_LOGS, text: t('pages:cronLogs') },
      { url: route.path, text: t('pages:cronLogDetails') },
    ],
  },
};

export const PAGE_COMMANDS_ROUTE: CustomRouteConfig = {
  path: getCommandsListUrl(),
  component: CommandList,
  name: 'Page Commands',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: route.path, text: t('pages:commands') },
    ],
  },
};

export const PAGE_COMMANDS_DETAILS_ROUTE: CustomRouteConfig = {
  path: getCommandDetailsUrlRaw(),
  component: CommandDetails,
  name: 'Commands Execute',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: PAGES_ROUTE_PATHS.PAGE_COMMANDS, text: t('pages:commands') },
      { url: route.path, text: t('pages:commandExecute') },
    ],
  },
};
