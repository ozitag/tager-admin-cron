<template>
  <page :title="t('pages:commandExecute')">
    <div v-if="command" class="select-row">
      <h3>{{ command.signature }}</h3>
      <small>{{ command.description }}</small>
      <div class="params">
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
      <CronScreen
        :content="response"
        :use-html="true"
        :use-empty-state="true"
        :input-content="getInputString(command.signature, args)"
      />
    </div>
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
import { Nullable, useResource } from '@tager/admin-services';

import { executeCommand, getCommandDetails } from '../../../services/requests';
import { Command } from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import { getStatusLabel } from '../../../utils/helper';

export default defineComponent({
  name: 'CommandDetails',
  components: {
    CronScreen,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
    const signature = computed<string>(
      () => context.root.$route.params.signature
    );
    const response = ref<string | null>(null);
    const args = ref<any[]>([]);
    const isSubmitting = ref<boolean>(false);

    const [fetchPost, { data: command }] = useResource<Nullable<Command>>({
      fetchResource: () => getCommandDetails(signature.value),
      initialValue: null,
      context,
    });

    onMounted(() => {
      fetchPost();
    });

    watch(command, () => {
      response.value = null;
      args.value = command.value
        ? command.value.arguments.map((i) => ({
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
    });

    const executeCommandHandler = (): void => {
      const body = {
        command: command.value?.signature,
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

    const getInputString = (command: string, args: Array<any>): string => {
      const _res = 'php artisan ' + command + ' ';
      const _args = args
        .filter((u) =>
          u.value && typeof u.value !== 'string' ? u.value.value : u.value
        )
        .map(
          (u) =>
            u.name +
            '=' +
            (u.value && typeof u.value !== 'string' ? u.value.value : u.value)
        )
        .join(' ');
      return _res + _args;
    };

    return {
      origin,
      getStatusLabel,
      command,
      executeCommandHandler,
      isSubmitting,
      args,
      getInputString,
      response,
      t,
    };
  },
});
</script>

<style scoped lang="scss">
.params {
  display: flex;
  margin: 10px 0 20px 0;

  .param {
    display: block;
    width: 33%;
    box-sizing: border-box;
    margin-right: 10px;
  }
}
</style>
