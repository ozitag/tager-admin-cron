<template>
  <Page :title="t('cron:cronLogs')">
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

      <template #cell(hasoutput)="{ row }">
        <div>
          <BaseButton v-if="row.hasoutput" :href="getCronDetailsUrl(row.id)">
            {{ t('cron:view') }}
          </BaseButton>
        </div>
      </template>
      <template #cell(actions)="{ row }">
        <BaseButton
          variant="icon"
          :title="t('cron:view')"
          :href="getCronDetailsUrl(row.id)"
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
  BaseButton,
  FormField,
  FormFieldMultiSelect,
  useDataTable,
  DataTable,
} from '@tager/admin-ui';
import { Page } from '@tager/admin-layout';
import { useI18n } from '@tager/admin-services';

import { getCronLogs } from '../../services/requests';
import { CronLogShort } from '../../typings/model';
import { getCronDetailsUrl } from '../../utils/paths';
import EyeIcon from '../../components/EyeIcon/EyeIcon.vue';

import { getColumnDefs } from './CronLogs.helpers';
import { useFilters } from './hooks/useFilters';

export default defineComponent({
  name: 'CronLogs',
  components: {
    EyeIcon,
    BaseButton,
    FormField,
    FormFieldMultiSelect,
    AdvancedSearch,
    Page,
    DataTable,
  },
  setup(props, context) {
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
      rowData: pageList,
      fetchEntityList: fetchList,
      isLoading,
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
      getCronDetailsUrl,
      t,
      dateFromFilter,
      dateToFilter,
      statusOptionFilters,
      statusFilter,
      commandFilter,
      commandsList,
      isLoading,
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
