import { TranslateFunction } from '@tager/admin-services';

export type CommandStatus = 'STARTED' | 'FAILED' | 'WAITING' | 'COMPLETED' | 'FINISHED';

export const getCommandStatusLabel = (status: CommandStatus, t: TranslateFunction): string => {
  switch (status) {
    case 'STARTED':
      return t('cron:statusStarted');
    case 'FAILED':
      return t('cron:statusFailed');
    case 'WAITING':
      return t('cron:statusWaiting');
    case 'COMPLETED':
    case 'FINISHED':
      return t('cron:statusCompleted');
    default:
      return 'Unknown';
  }
};

export const getCommandStatusColor = (status: CommandStatus): string => {
  switch (status) {
    case 'STARTED':
      return '#9f9f9f';
    case 'FAILED':
      return 'rgba(255, 0, 0, 0.58)';
    case 'WAITING':
      return 'rgba(255,211,71)';
    case 'COMPLETED':
    case 'FINISHED':
      return '#679bff';
    default:
      return 'Unknown';
  }
};
