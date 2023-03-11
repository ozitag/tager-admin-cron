<template>
  <Page :title="t('cron:commandsLogs')">
    <DataTable
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
      <template #filters>
        <AdvancedSearch>
          <div class="filters">
            <FormFieldMultiSelect
              v-model:selected-options="commandFilter"
              :options="commandsList"
              name="categoryFilter"
              :searchable="true"
              :label="t('cron:command')"
              class="filter"
            />

            <FormFieldMultiSelect
              v-model:selected-options="statusFilter"
              :options="statusOptionFilters"
              name="statusFilter"
              :searchable="true"
              :label="t('cron:status')"
              class="filter"
            />
          </div>
          <div class="filters">
            <FormField
              v-model:value="dateFromFilter"
              :label="t('cron:from')"
              name="fromDateFilter"
              type="date"
              :max="dateToFilter"
            />

            <FormField
              v-model:value="dateToFilter"
              :label="t('cron:to')"
              name="toDateFilter"
              type="date"
              :min="dateFromFilter"
            />
          </div>
        </AdvancedSearch>
      </template>

      <template #cell(status)="{ row }">
        <div :class="['status', getStatusLabel(row.status)]">
          {{ getStatusLabel(row.status) }}
        </div>
      </template>
      <template #cell(execution-time)="{ row }">
        <span v-if="row.execution_time"
          >{{ row.execution_time.toFixed(2) }} {{ t('cron:secondShort') }}</span
        >
      </template>
      <template #cell(actions)="{ row }">
        <BaseButton
          variant="icon"
          :title="t('cron:view')"
          :href="getCommandLogDetailsUrl(row.id)"
        >
          <EyeIcon />
        </BaseButton>
      </template>
    </DataTable>
  </Page>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';
import { useRoute, useRouter } from 'vue-router';

import {
  AdvancedSearch,
  useDataTable,
  DataTable,
  FormFieldMultiSelect,
  FormField,
  BaseButton,
} from '@tager/admin-ui';
import { Page } from '@tager/admin-layout';
import { useI18n } from '@tager/admin-services';

import { getCommandsLogs } from '../../../services/requests';
import { CommandLogShort } from '../../../typings/model';
import { getCommandLogDetailsUrl } from '../../../utils/paths';
import EyeIcon from '../../../components/EyeIcon/EyeIcon.vue';
import { getStatusLabel } from '../../../utils/helper';

import { getColumnDefs } from './CommandLogs.helpers';
import { useFilters } from './Hooks/useFilters';

export default defineComponent({
  name: 'CommandLogs',
  components: {
    BaseButton,
    FormField,
    FormFieldMultiSelect,
    AdvancedSearch,
    Page,
    EyeIcon,
    DataTable,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();

    const {
      filterParams,
      dateFromFilter,
      dateToFilter,
      statusOptionFilters,
      statusFilter,
      commandFilter,
      commandsList,
    } = useFilters(route);

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
      resourceName: 'Page list',
      pageSize: 100,
    });

    watch(filterParams, () => {
      const newQuery = {
        ...pick(route.query, ['query', 'pageNumber']),
        ...filterParams.value,
      };

      if (!isEqual(route.query, newQuery)) {
        router.replace({ query: newQuery });
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
      getCommandLogDetailsUrl,
      statusOptionFilters,
      isLoading,
      t,
    };
  },
});
</script>

<style scoped lang="scss">
.filters {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;

  &:not(:first-child) {
    margin-top: 10px;
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
</style>
