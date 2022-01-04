<template>
  <page :title="t('pages:commands')">
    <div class="select-row">
      <cron-select
        v-model="selectedCommad"
        :options="commandsList"
      ></cron-select>
      <div v-if="selectedCommad" class="params">
        <div v-for="argument in args" :key="argument.name" class="param">
          <base-select
            v-if="argument.values.length"
            v-model="argument.value"
            :options="argument.values"
            :placeholder="argument.name"
          />
          <base-input
            v-else
            :key="argument.name"
            v-model="argument.value"
            :placeholder="argument.name"
          />
        </div>
        <base-button :disabled="isSubmitting" @click="executeCommandHandler"
          >Execute</base-button
        >
      </div>
    </div>
    <div v-if="response" class="response" v-html="response"></div>
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

import { useTranslation } from '@tager/admin-ui';
import { useResource } from '@tager/admin-services';

import { executeCommand, getCommandsList } from '../../../services/requests';
import CronSelect from '../../../components/CronSelect';

export default defineComponent({
  name: 'CommandList',
  components: {
    CronSelect,
  },
  setup(props, context) {
    const response = ref<string | null>(null);
    const args = ref<any[]>([]);
    const isSubmitting = ref<boolean>(false);
    const selectedCommad = ref<string | null>(null);
    const { t } = useTranslation(context);

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
        label: i.signature + (i.description ? ` [${i.description}]` : ''),
      }))
    );

    watch(selectedCommad, () => {
      response.value = null;
      const _command = _commandsList.value.find(
        (i) => i.signature === selectedCommad.value
      );
      args.value = _command
        ? _command.arguments.map((i) => ({
            ...i,
            value: i.default,
            values: i.values
              ? i.values.map((u) => ({
                  label: u,
                  value: u,
                }))
              : [],
          }))
        : [];
      console.log('watch', args.value);
    });

    const executeCommandHandler = (): void => {
      const body = {
        command: selectedCommad.value,
        arguments: args.value.map((u) => ({
          name: u.name,
          value:
            u.value && typeof u.value !== 'string' ? u.value.value : u.value,
        })),
      };

      isSubmitting.value = true;
      executeCommand(body)
        .then((res) => {
          context.root.$toast({
            variant: 'success',
            title: t('pages:success'),
            body: t('pages:execSuccessMessage'),
          });
          response.value = res.data.response;
        })
        .catch(() => {
          response.value = null;
          context.root.$toast({
            variant: 'danger',
            title: t('pages:error'),
            body: t('pages:execErrorMessage'),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    };

    return {
      t,
      commandsList,
      selectedCommad,
      args,
      executeCommandHandler,
      isSubmitting,
      response,
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
