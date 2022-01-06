<template>
  <page :title="t('pages:commands')">
    <data-table
      :column-defs="columnDefs"
      :row-data="commandsList"
      :loading="isLoading"
      :search-query="searchQuery"
      @change="handleChange"
    >
      <template v-slot:cell(actions)="{ row }">
        <base-button
          variant="icon"
          :title="t('pages:view')"
          :href="getCommandDetailsUrl(row.signature)"
        >
          <ConsoleIcon />
        </base-button>
      </template>
    </data-table>
  </page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';

import { useDataTable, useTranslation } from '@tager/admin-ui';

import { getCommandsList } from '../../../services/requests';
import CronSelect from '../../../components/CronSelect';
import CronScreen from '../../../components/CronScreen';
import { getCommandDetailsUrl } from '../../../utils/paths';
import ConsoleIcon from '../../../components/ConsoleIcon/ConsoleIcon.vue';

import { getColumnDefs } from './CommandList.helper';

export default defineComponent({
  name: 'CommandList',
  components: {
    CronSelect,
    CronScreen,
    ConsoleIcon,
  },
  setup(props, context) {
    const selectedCommad = ref<string | null>(null);
    const { t } = useTranslation(context);

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
      context,
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
