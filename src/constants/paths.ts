export const PAGES_ROUTE_PATHS = {
  PAGE_CRON_LOGS: '/cron/cron-logs',
  PAGE_CRON_LOGS_DETAILS: '/cron/cron-logs/:id',

  PAGE_COMMANDS: '/cron/commands',
  PAGE_COMMANDS_DETAILS: '/cron/commands/:signature',

  PAGE_COMMANDS_LOGS: '/cron/command-logs',
  PAGE_COMMANDS_LOGS_DETAILS: '/cron/command-logs/:id',
} as const;
