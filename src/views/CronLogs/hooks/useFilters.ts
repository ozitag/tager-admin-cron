import { computed, onMounted, ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import { useResource } from '@tager/admin-services';
import {
  getFilterParamAsStringArray,
  getFilterParams,
  OptionType,
} from '@tager/admin-ui';

import { getCronCommandsList } from '../../../services/requests';

export const useFilters = (route: RouteLocationNormalizedLoaded) => {
  const [fetchTemplateList, { data: _commandsList }] = useResource({
    fetchResource: getCronCommandsList,
    initialValue: [],
  });

  onMounted(() => {
    fetchTemplateList();
  });

  const commandsList = computed<OptionType[]>(() =>
    _commandsList.value.map((i) => ({
      value: i.value,
      label: i.value,
    }))
  );

  const initialCommandFilter = computed<OptionType[]>(() => {
    const queryValue = getFilterParamAsStringArray(route.query, 'signature');
    return commandsList.value.filter(({ value }) =>
      queryValue.some((selected) => selected === value)
    );
  });
  const commandFilter = ref<OptionType[]>(initialCommandFilter.value);

  const initialDateFromFilter = computed(() => {
    const value = getFilterParamAsStringArray(route.query, 'date-from');
    return value.length > 0 ? value[0] : '';
  });
  const dateFromFilter = ref<string | null>(initialDateFromFilter.value);

  const initialDateToFilter = computed(() => {
    const value = getFilterParamAsStringArray(route.query, 'date-to');
    return value.length > 0 ? value[0] : '';
  });
  const dateToFilter = ref<string | null>(initialDateToFilter.value);

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
      ['command']: commandFilter.value.map(({ value }) => value),
      ['status']: statusFilter.value.map(({ value }) => value),
    };

    if (dateFromFilter.value) {
      filters['date-from'] = dateFromFilter.value;
    }

    if (dateToFilter.value) {
      filters['date-to'] = dateToFilter.value;
    }

    return getFilterParams(filters);
  });

  return {
    filterParams,
    dateFromFilter,
    dateToFilter,
    statusOptionFilters,
    statusFilter,
    commandFilter,
    commandsList,
  };
};
