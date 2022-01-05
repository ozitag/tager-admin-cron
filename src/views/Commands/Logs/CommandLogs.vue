<template>
  <page :title="t('pages:commandsLogs')">
    <data-table
      :column-defs="columnDefs"
      :row-data="rowData"
      :error-message="errorMessage"
      :search-query="searchQuery"
      :loading="isLoading"
      :pagination="{
        pageSize,
        pageCount,
        pageNumber,
      }"
      @change="handleChange"
    >
      <template v-slot:filters>
        <cron-select v-model="commandFilter" :options="commandsList" />
      </template>

      <template v-slot:filters>
        <advanced-search>
          <div class="filters">
            <form-field-multi-select
              v-model="commandFilter"
              :options="commandsList"
              name="categoryFilter"
              :searchable="true"
              :label="t('pages:signature')"
              class="filter"
            />

            <div class="filter">
              <div class="date-label">
                {{ $t('pages:dateOfPublication') }}
              </div>

              <div class="date-content">
                <form-field
                  v-model="dateFromFilter"
                  :label="t('pages:from')"
                  name="fromDateFilter"
                  type="date"
                  :max="dateToFilter"
                />

                <form-field
                  v-model="dateToFilter"
                  :label="t('pages:to')"
                  name="toDateFilter"
                  type="date"
                  :min="dateFromFilter"
                />
              </div>
            </div>

            <form-field-multi-select
              v-model="statusFilter"
              :options="statusOptionFilters"
              name="statusFilter"
              :searchable="true"
              :label="t('pages:status')"
              class="filter"
            />
          </div>
        </advanced-search>
      </template>

      <template v-slot:cell(status)="{ row }">
        <div :class="['status', getStatusLabel(row.status)]">
          {{ getStatusLabel(row.status) }}
        </div>
      </template>
      <template v-slot:cell(arguments)="{ row }">
        <div v-for="(val, key) in row.arguments" :key="key" class="argument">
          <div class="argument_name">{{ key }}:</div>
          <div v-if="val" class="argument_value">{{ val }}</div>
          <div v-else class="argument_null"></div>
        </div>
      </template>
      <template v-slot:cell(execution-time)="{ row }">
        <span v-if="row.execution_time"
          >{{ row.execution_time }} {{ t('pages:secondShort') }}</span
        >
      </template>
      <template v-slot:cell(actions)="{ row }">
        <base-button
          variant="icon"
          :title="t('pages:view')"
          :href="getCommandDetailsUrl(row.id)"
        >
          <EyeIcon />
        </base-button>
      </template>
    </data-table>
  </page>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';

import { useDataTable, useTranslation } from '@tager/admin-ui';

import { getCommandsLogs } from '../../../services/requests';
import { CommandLogShort } from '../../../typings/model';
import CronSelect from '../../../components/CronSelect';
import { getCommandDetailsUrl } from '../../../utils/paths';
import EyeIcon from '../../../components/EyeIcon/EyeIcon.vue';
import { getStatusLabel } from '../../../utils/helper';

import { getColumnDefs } from './CommandLogs.helpers';
import { useFilters } from './Hooks/useFilters';

export default defineComponent({
  name: 'CommandLogs',
  components: {
    CronSelect,
    EyeIcon,
  },
  setup(props, context) {
    const { t } = useTranslation(context);

    const {
      filterParams,
      dateFromFilter,
      dateToFilter,
      statusOptionFilters,
      statusFilter,
      commandFilter,
      commandsList,
    } = useFilters(context);

    const {
      fetchEntityList: fetchList,
      rowData: pageList,
      errorMessage,
      isLoading,
      searchQuery,
      handleChange,
      pageSize,
      pageCount,
      pageNumber,
    } = useDataTable<CommandLogShort>({
      fetchEntityList: (params) => {
        return getCommandsLogs({
          query: params.searchQuery,
          pageNumber: params.pageNumber,
          pageSize: params.pageSize,
          ...filterParams.value,
        });
      },
      initialValue: [],
      context,
      resourceName: 'Page list',
      pageSize: 100,
    });

    watch(filterParams, () => {
      const newQuery = {
        ...pick(context.root.$route.query, ['query', 'pageNumber']),
        ...filterParams.value,
      };

      if (!isEqual(context.root.$route.query, newQuery)) {
        context.root.$router.replace({ query: newQuery });
        fetchList();
      }
    });

    const columnDefs = getColumnDefs(t);

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
      commandFilter,
      dateToFilter,
      dateFromFilter,
      statusFilter,
      commandsList,
      getStatusLabel,
      getCommandDetailsUrl,
      statusOptionFilters,
      isLoading,
      t,
    };
  },
});
</script>

<style scoped lang="scss">
.filters {
  display: flex;
  margin: 0 -10px;

  &:not(:first-child) {
    margin-top: 10px;
  }

  .filter {
    padding: 10px 10px 0;
    width: 50%;
    margin: 0;
  }
}
.status {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 11px;
  color: #fff;

  &.Failed {
    background: rgba(255, 0, 0, 0.58);
  }
  &.Finished {
    background: #679bff;
  }
  &.Started {
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
