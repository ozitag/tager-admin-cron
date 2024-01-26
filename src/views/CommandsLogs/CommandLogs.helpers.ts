import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';

import { getCommandLogDetailsUrl } from '../../utils/paths';
import { getCommandStatusColor, getCommandStatusLabel } from '../../utils/helper';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 1,
    name: 'ID',
    field: 'id',
    type: 'name',
    width: '60px',
    format: ({row}) => ({
      adminLink: {
        text: String(row.id),
        url: getCommandLogDetailsUrl(row.id),
      },
    })
  },

  {
    id: 3,
    name: t('cron:createdAt'),
    field: 'created_at',
    type: 'datetime',
    width: '168px',
  },

  {
    id: 5,
    name: t('cron:status'),
    field: 'status',
    width: '80px',
    type: 'badge',
    format: ({row}) => {
      return {
        textColor: '#fff',
        color: getCommandStatusColor(row.status),
        label: getCommandStatusLabel(row.status, t),
      }
    }
  },
  {
    id: 4,
    name: t('cron:duration'),
    field: 'execution_time',
    width: '135px',
    style: {
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    headStyle:{
      textAlign: 'center'
    },
    format: ({row}) => {
      return row.execution_time.toFixed(2) + ' sec.'
    }
  },
  {
    id: 1,
    name: t('cron:command'),
    field: 'signature',
    type: 'name',
    format: ({ row }) => ({
      adminLink: {
        text: row.signature,
        url: null,
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
