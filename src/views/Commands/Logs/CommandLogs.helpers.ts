import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 1,
    name: t('pages:command'),
    field: 'signature',
  },
  {
    id: 2,
    name: t('pages:arguments'),
    field: 'arguments',
  },
  {
    id: 3,
    name: t('pages:createdAt'),
    field: 'created_at',
    type: 'datetime',
  },
  {
    id: 4,
    name: t('pages:executionTime'),
    field: 'execution_time',
  },
  {
    id: 5,
    name: t('pages:status'),
    field: 'status',
  },
  {
    id: 6,
    name: t('pages:user'),
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
