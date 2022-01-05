<template>
  <page :title="t('pages:cronLogs')">
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
import { defineComponent, watch } from '@vue/composition-api';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';

import { useDataTable, useTranslation } from '@tager/admin-ui';

import { getCronLogs } from '../../../services/requests';
import { CronLogShort } from '../../../typings/model';
import CronSelect from '../../../components/CronSelect';
import { getCronDetailsUrl } from '../../../utils/paths';
import { getStatusLabel } from '../../../utils/helper';
import EyeIcon from '../../../components/EyeIcon/EyeIcon.vue';

import { getColumnDefs } from './CronLogs.helpers';
import { useFilters } from './Hooks/useFilters';

export default defineComponent({
  name: 'CronLogs',
  components: {
    EyeIcon,
    CronSelect,
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
      getStatusLabel,
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
</style>
