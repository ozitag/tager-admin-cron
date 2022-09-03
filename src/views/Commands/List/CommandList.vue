<template>
  <Page :title="t('cron:commands')">
    <DataTable
      :column-defs="columnDefs"
      :row-data="commandsList"
      :loading="isLoading"
      :search-query="searchQuery"
      @change="handleChange"
    >
      <template #cell(actions)="{ row }">
        <BaseButton
          variant="icon"
          :title="t('cron:view')"
          :href="getCommandDetailsUrl(row.signature)"
        >
          <ConsoleIcon />
        </BaseButton>
      </template>
    </DataTable>
  </Page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { BaseButton, useDataTable, DataTable } from '@tager/admin-ui';
import { Page } from '@tager/admin-layout';
import { useI18n } from '@tager/admin-services';

import { getCommandsList } from '../../../services/requests';
import { getCommandDetailsUrl } from '../../../utils/paths';
import ConsoleIcon from '../../../components/ConsoleIcon/ConsoleIcon.vue';

import { getColumnDefs } from './CommandList.helper';

export default defineComponent({
  name: 'CommandList',
  components: {
    BaseButton,
    Page,
    ConsoleIcon,
    DataTable,
  },
  setup() {
    const selectedCommad = ref<string | null>(null);
    const { t } = useI18n();

    const {
      fetchEntityList: fetchTemplateList,
      rowData: commandsList,
      isLoading,
      searchQuery,
      handleChange,
    } = useDataTable({
      fetchEntityList: (params) => {
        return getCommandsList(params.searchQuery);
      },
      initialValue: [],
    });

    onMounted(() => {
      fetchTemplateList();
    });

    const columnDefs = getColumnDefs(t);

    return {
      t,
      commandsList,
      selectedCommad,
      isLoading,
      searchQuery,
      columnDefs,
      getCommandDetailsUrl,
      handleChange,
    };
  },
});
</script>

<style scoped lang="scss">
.params {
  display: flex;
  margin: 10px 0;

  .param {
    display: block;
    width: 33%;
    box-sizing: border-box;
    margin-right: 10px;
  }
}

.response {
  background: #fbfbfb;
  padding: 10px;
  border: 1px solid #f0f0f0;
}
</style>
