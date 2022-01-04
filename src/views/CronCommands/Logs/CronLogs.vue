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
      <template v-slot:cell(haserror)="{ row }">
        <div>
          <base-button v-if="row.haserror" :href="getCronDetailsUrl(row.id)">
            {{ t('pages:view') }}
          </base-button>
        </div>
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
import {getCronDetailsUrl} from "../../../utils/paths";
import {getStatusLabel} from "../../../utils/helper";

export default defineComponent({
  name: 'CronLogs',
  components: {
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
        name: t('pages:class'),
        field: 'class',
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
      },
      {
        id: 5,
        name: t('pages:status'),
        field: 'status',
      },
      {
        id: 6,
        name: t('pages:commandError'),
        field: 'haserror',
      },
      {
        id: 7,
        name: t('pages:output'),
        field: 'hasoutput',
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
