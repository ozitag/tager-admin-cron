import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';
import { getCronDetailsUrl } from '../../utils/paths';
import { getCommandStatusColor, getCommandStatusLabel } from '../../utils/helper';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 1,
    name: 'ID',
    field: 'id',
    type: 'name',
    width: '70px',
    format: ({ row }) => ({
      adminLink: {
        text: String(row.id),
        url: getCronDetailsUrl(row.id)
      },
    })
  },
  {
    id: 3,
    name: t('cron:beginAt'),
    field: 'begin_at',
    type: 'datetime',
    width: '168px',
  },
  {
    id: 5,
    name: t('cron:duration'),
    field: 'duration',
    width: '135px',
    headStyle: {
      textAlign: 'center'
    },
    style: {
      textAlign: 'center'
    },
    format: ({row}) => {
      return row.duration !== null ? row.duration + ' sec.' : '';
    }
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
    id: 1,
    name: t('cron:command'),
    field: 'command',
  },
  {
    id: 6,
    name: '',
    field: 'actions',
    style: { whiteSpace: 'nowrap', width: '40px' },
    headStyle: { whiteSpace: 'nowrap', width: '40px' },
  },
];
