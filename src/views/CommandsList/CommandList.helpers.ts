import { TFunction } from 'i18next';

import { ColumnDefinition } from '@tager/admin-ui';
import { getCommandDetailsUrl } from '../../utils/paths';

export const getColumnDefs = (t: TFunction): Array<ColumnDefinition<any>> => [
  {
    id: 1,
    name: t('cron:command'),
    field: 'signature',
    type: 'name',
    format: ({ row }) => ({
      adminLink: {
        text: row.signature,
        url: getCommandDetailsUrl(row.signature)
      },
    })
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
    width: '40px',
  },
];
