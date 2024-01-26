import { computed, onMounted, ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import { useResource } from '@tager/admin-services';
import {
  getFilterParamAsStringArray,
  getFilterParams,
  OptionType,
} from '@tager/admin-ui';

import { getCommandsList } from '../../../services/requests';

export const useFilters = (route: RouteLocationNormalizedLoaded) => {
  const [fetchTemplateList, { data: _commandsList }] = useResource({
    fetchResource: getCommandsList,
    initialValue: [],
  });

  onMounted(() => {
    fetchTemplateList('');
  });

  const commandsList = computed<OptionType[]>(() =>
    _commandsList.value.map((i) => ({
      value: i.signature,
      label: i.signature,
    }))
  );

  const initialCommandFilter = computed<OptionType[]>(() => {
    const queryValue = getFilterParamAsStringArray(route.query, 'signature');
    return commandsList.value.filter(({ value }) =>
      queryValue.some((selected) => selected === value)
    );
  });
  const commandFilter = ref<OptionType[]>(initialCommandFilter.value);

  const statusOptionFilters = computed<OptionType[]>(() => [
    { label: 'Finished', value: 'FINISHED' },
    { label: 'Started', value: 'STARTED' },
    { label: 'Failed', value: 'FAILED' },
  ]);
  const initialStatusFilter = computed<OptionType[]>(() => {
    const queryValue = getFilterParamAsStringArray(route.query, 'status');
    return statusOptionFilters.value.filter(({ value }) =>
      queryValue.some((selected) => selected === value)
    );
  });
  const statusFilter = ref<OptionType[]>(initialStatusFilter.value);

  const filterParams = computed(() => {
    const filters: Record<string, string | string[]> = {
      ['signature']: commandFilter.value.map(({ value }) => value),
      ['status']: statusFilter.value.map(({ value }) => value),
    };

    return getFilterParams(filters);
  });

  return {
    filterParams,
    statusOptionFilters,
    statusFilter,
    commandFilter,
    commandsList,
  };
};
