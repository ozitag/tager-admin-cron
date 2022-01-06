import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 1,
    name: t('pages:command'),
    field: 'command',
  },
  {
    id: 3,
    name: t('pages:beginAt'),
    field: 'begin_at',
    type: 'datetime',
  },
  {
    id: 4,
    name: t('pages:endAt'),
    field: 'end_at',
    type: 'datetime',
  },
  {
    id: 5,
    name: t('pages:status'),
    field: 'status',
  },
  {
    id: 6,
    name: '',
    field: 'actions',
    style: { whiteSpace: 'nowrap', width: '40px' },
    headStyle: { whiteSpace: 'nowrap', width: '40px' },
  },
];