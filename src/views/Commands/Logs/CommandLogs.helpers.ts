import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';

import { getCommandLogDetailsUrl } from '../../../utils/paths';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 3,
    name: t('cron:createdAt'),
    field: 'created_at',
    type: 'datetime',
    width: '180px',
  },
  {
    id: 5,
    name: t('cron:status'),
    field: 'status',
    width: '80px',
    style: {
      whiteSpace: 'nowrap',
    },
  },
  {
    id: 1,
    name: t('cron:command'),
    field: 'signature',
    type: 'name',
    format: ({ row }) => ({
      adminLink: {
        text: row.signature,
        url: getCommandLogDetailsUrl(row.id),
      },
      paramList: Object.keys(row.arguments).map((param) => {
        return {
          name: param,
          value: row.arguments[param]
            ? row.arguments[param].length < 100
              ? row.arguments[param]
              : row.arguments[param].slice(0, 100) + '...'
            : '',
        };
      }),
    }),
    style: {
      whiteSpace: 'nowrap',
    },
  },
  {
    id: 4,
    name: t('cron:executionTime'),
    field: 'execution_time',
    width: '80px',

    style: {
      whiteSpace: 'nowrap',
    },
  },
  {
    id: 6,
    name: t('cron:user'),
    field: 'user.name',
    style: {
      whiteSpace: 'nowrap',
    },
  },
  {
    id: 7,
    name: '',
    field: 'actions',
    width: '40px',
  },
];
