import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 1,
    name: t('cron:command'),
    field: 'signature',
  },
  {
    id: 2,
    name: t('cron:arguments'),
    field: 'arguments',
  },
  {
    id: 3,
    name: t('cron:createdAt'),
    field: 'created_at',
    type: 'datetime',
  },
  {
    id: 4,
    name: t('cron:executionTime'),
    field: 'execution_time',
  },
  {
    id: 5,
    name: t('cron:status'),
    field: 'status',
  },
  {
    id: 6,
    name: t('cron:user'),
    field: 'user.name',
  },
  {
    id: 7,
    name: '',
    field: 'actions',
    style: { whiteSpace: 'nowrap', width: '40px' },
    headStyle: { whiteSpace: 'nowrap', width: '40px' },
  },
];
