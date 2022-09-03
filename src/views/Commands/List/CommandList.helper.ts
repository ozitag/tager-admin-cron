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
    name: t('cron:description'),
    field: 'description',
  },
  {
    id: 3,
    name: '',
    field: 'actions',
    style: { whiteSpace: 'nowrap', width: '40px' },
    headStyle: { whiteSpace: 'nowrap', width: '40px' },
  },
];
