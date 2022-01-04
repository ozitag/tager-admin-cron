<template>
  <page :title="t('pages:commandsLogs')">
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
      <template v-slot:filters>
        <cron-select v-model="commandFilter" :options="commandsList" />
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
      <template v-slot:cell(hasoutput)="{ row }">
        <base-button v-if="row.hasoutput" :href="getCommandDetailsUrl(row.id)">
          {{ t('pages:view') }}
        </base-button>
      </template>
    </data-table>
  </page>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
} from '@vue/composition-api';
import pick from 'lodash/pick';
import isEqual from 'lodash/isEqual';

import {
  ColumnDefinition,
  getFilterParamAsStringArray,
  getFilterParams,
  useDataTable,
  useTranslation,
} from '@tager/admin-ui';
import { useResource } from '@tager/admin-services';

import { getCommandsList, getCommandsLogs } from '../../../services/requests';
import { CommandLogShort } from '../../../typings/model';
import CronSelect from '../../../components/CronSelect';
import {getCommandDetailsUrl} from "../../../utils/paths";

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
  name: 'CommandLogs',
  components: {
    CronSelect,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
    const initialCommandFilter = computed(() => {
      const value = getFilterParamAsStringArray(
        context.root.$route.query,
        'signature'
      );
      return value.length > 0 ? value[0] : '';
    });
    const commandFilter = ref<string | null>(initialCommandFilter.value);

    const [fetchTemplateList, { data: _commandsList }] = useResource({
      fetchResource: getCommandsList,
      initialValue: [],
      context,
    });

    onMounted(() => {
      fetchTemplateList();
    });

    const commandsList = computed(() =>
      _commandsList.value.map((i) => ({
        value: i.signature,
        label: i.signature,
      }))
    );

    const filterParams = computed(() => {
      return getFilterParams({
        signature: getFilterParamAsStringArray(
          context.root.$route.query,
          'signature'
        ),
      });
    });

    const {
      fetchEntityList: fetchList,
      rowData: pageList,
      errorMessage,
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

    watch(commandFilter, () => {
      const newQuery = {
        ...pick(context.root.$route.query, ['query', 'pageNumber']),
        ...getFilterParams({
          signature: commandFilter.value || '',
        }),
      };

      if (!isEqual(context.root.$route.query, newQuery)) {
        context.root.$router.replace({ query: newQuery });
        fetchList();
      }
    });

    const columnDefs: Array<ColumnDefinition<any>> = [
      {
        id: 1,
        name: t('pages:command'),
        field: 'signature',
      },
      {
        id: 2,
        name: t('pages:arguments'),
        field: 'arguments',
      },
      {
        id: 3,
        name: t('pages:createdAt'),
        field: 'created_at',
        type: 'datetime',
      },
      {
        id: 4,
        name: t('pages:executionTime'),
        field: 'execution_time',
      },
      {
        id: 5,
        name: t('pages:status'),
        field: 'status',
      },
      {
        id: 6,
        name: t('pages:user'),
        field: 'user.name',
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
      commandFilter,
      commandsList,
      getStatusLabel,
      getCommandDetailsUrl,
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
