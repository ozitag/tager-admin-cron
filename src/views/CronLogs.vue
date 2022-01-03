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
      <template v-slot:cell(output)="{ row }">
        <div v-html="row.output"></div>
      </template>
      <template v-slot:cell(error)="{ row }">
        <div v-html="row.error"></div>
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

import { getCronLogs } from '../services/requests';
import { CommandLog } from '../typings/model';
import CronSelect from '../components/CronSelect';

const getStatusLabel = (label: string): string => {
  switch (label) {
    case 'STARTED':
      return 'started';
    case 'FAILED':
      return 'failed';
    default:
      return 'finished';
  }
};

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
    } = useDataTable<CommandLog>({
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
        id: 0,
        name: t('pages:command'),
        field: 'command',
      },
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
        field: 'error',
      },
      {
        id: 7,
        name: t('pages:output'),
        field: 'output',
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
.argument {
  display: flex;
  margin: 0px 5px 5px 0px;

  .argument_name {
    background: #f7f7f7;
    padding: 2px;
    border-radius: 4px 0px 0px 4px;
  }
  .argument_value {
    background: #ececec;
    padding: 2px;
    border-radius: 0px 4px 4px 0px;
  }
  .argument_null {
    background: #fcc;
    padding: 2px;
    border-radius: 0px 4px 4px 0px;
  }
}
</style>
