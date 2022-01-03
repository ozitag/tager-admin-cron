import { CustomRouteConfig } from '@tager/admin-layout';

import CommandList from '../views/CommandList.vue';
import CommandLogs from '../views/CommandLogs.vue';
import CronLogs from '../views/CronLogs.vue';

import { PAGES_ROUTE_PATHS } from './paths';

export const PAGE_COMMANDS_LOGS_ROUTE: CustomRouteConfig = {
  path: PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS,
  component: CommandLogs,
  name: 'Commands Logs',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: route.path, text: t('pages:commandsLogs') },
    ],
  },
};

export const PAGE_CRON_LOGS_ROUTE: CustomRouteConfig = {
  path: PAGES_ROUTE_PATHS.PAGE_CRON_LOGS,
  component: CronLogs,
  name: 'Cron Logs',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: route.path, text: t('pages:cronLogs') },
    ],
  },
};

export const PAGE_COMMANDS_ROUTE: CustomRouteConfig = {
  path: PAGES_ROUTE_PATHS.PAGE_COMMANDS,
  component: CommandList,
  name: 'Page Commands',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('pages:home') },
      { url: route.path, text: t('pages:commands') },
    ],
  },
};
