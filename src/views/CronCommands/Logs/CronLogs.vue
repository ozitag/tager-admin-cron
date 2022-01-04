<template>
  <page :title="t('pages:cronLogs')">
    <data-table
      :column-defs="columnDefs"
      :row-data="rowData"
      :error-message="errorMessage"
      :search-query="searchQuery"
      :pagination="{
        pageSize,
        pageCount,
        pageNumber,
      }"
      @change="handleChange"
    >
      <template v-slot:cell(status)="{ row }">
        <div :class="['status', getStatusLabel(row.status)]">
          {{ getStatusLabel(row.status) }}
        </div>
      </template>
      <template v-slot:cell(hasoutput)="{ row }">
        <div>
          <base-button v-if="row.hasoutput" :href="getCronDetailsUrl(row.id)">
            {{ t('pages:view') }}
          </base-button>
        </div>
      </template>
      <template v-slot:cell(actions)="{ row }">
        <base-button
          variant="icon"
          :title="t('pages:view')"
          :href="getCronDetailsUrl(row.id)"
        >
          <EyeIcon />
        </base-button>
      </template>
    </data-table>
  </page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import {
  ColumnDefinition,
  useDataTable,
  useTranslation,
} from '@tager/admin-ui';

import { getCronLogs } from '../../../services/requests';
import { CronLogShort } from '../../../typings/model';
import CronSelect from '../../../components/CronSelect';
import { getCronDetailsUrl } from '../../../utils/paths';
import { getStatusLabel } from '../../../utils/helper';
import EyeIcon from '../../../components/EyeIcon/EyeIcon.vue';

export default defineComponent({
  name: 'CronLogs',
  components: {
    EyeIcon,
    CronSelect,
  },
  setup(props, context) {
    const { t } = useTranslation(context);

    const {
      rowData: pageList,
      errorMessage,
      searchQuery,
      handleChange,
      pageSize,
      pageCount,
      pageNumber,
    } = useDataTable<CronLogShort>({
      fetchEntityList: (params) => {
        return getCronLogs({
          query: params.searchQuery,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
        });
      },
      initialValue: [],
      context,
      resourceName: 'Page list',
      pageSize: 100,
    });

    const columnDefs: Array<ColumnDefinition<any>> = [
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

    return {
      columnDefs,
      origin,
      rowData: pageList,
      errorMessage: errorMessage,
      searchQuery,
      handleChange,
      pageSize,
      pageCount,
      pageNumber,
      getStatusLabel,
      getCronDetailsUrl,
      t,
    };
  },
});
</script>

<style scoped lang="scss">
.filter {
  margin-bottom: 10px;
}
.status {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 11px;
  color: #fff;

  &.failed {
    background: rgba(255, 0, 0, 0.58);
  }
  &.finished {
    background: #679bff;
  }
  &.started {
    background: #9f9f9f;
  }
}
</style>
