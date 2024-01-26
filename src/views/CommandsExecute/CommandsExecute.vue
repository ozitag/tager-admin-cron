<template>
  <Page :title="t('cron:commandExecute')" :is-content-loading="initialLoading">
    <div v-if="command" class="select-row">
      <h3>{{ command.signature }}</h3>
      <small>{{ command.description }}</small>
      <hr/>

      <div class="row-cols-3">
        <div v-for="argument in args" :key="argument.name" class="param">
          <BaseSelect
            v-if="argument.values.length"
            v-model:value="argument.value"
            :options="argument.values"
          />
          <FormField
            v-else
            :label="argument.name"
            :key="argument.name"
            v-model:value="argument.value"
          />
        </div>
      </div>

      <FormFieldOptionsSwitcherTrueFalse v-model:value="async" :label="$i18n.t('cron:runInBackgroundLabel')" :description="$i18n.t('cron:runInBackgroundDescription')" />

      <CronScreen
        :content="response"
        :use-html="true"
        :use-empty-state="true"
        :input-content="getInputString(command.signature, args)"
      />
    </div>

    <template #footer>
      <FormFooter v-if="!initialLoading"
        back-href="/"
        :is-submitting="isSubmitting"
        :is-creation="true"
        :can-create-another="false"
        :save-and-exit-label="null"
        :submit-label="t('cron:execute')"
        @submit="executeCommandHandler"
      />
    </template>
  </Page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { BaseButton, BaseInput, BaseSelect, FormField, FormFieldSingleSelect, FormFooter, FormFieldOptionsSwitcherTrueFalse } from '@tager/admin-ui';
import {
  navigateBack,
  Nullable,
  useI18n,
  useResource,
  useToast
} from '@tager/admin-services';
import { Page } from '@tager/admin-layout';

import { executeCommand, getCommandDetails } from '../../services/requests';
import { Command } from '../../typings/model';
import CronScreen from '../../components/CronScreen';
import { getCommandsListUrl, getCommandsLogsUrl } from '../../utils/paths';

export default defineComponent({
  name: 'CommandsExecute',
  components: {
    BaseButton,
    BaseInput,
    BaseSelect,
    Page,
    FormFieldSingleSelect,
    FormField,
    CronScreen,
    FormFooter,
    FormFieldOptionsSwitcherTrueFalse
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const signature = computed<string>(() => route.params.signature as string);
    const response = ref<string | null>(null);
    const args = ref<any[]>([]);
    const isSubmitting = ref<boolean>(false);

    const async = ref<boolean>(false);

    const [fetchCommand, { data: command, loading }] = useResource<Nullable<Command>>({
      fetchResource: () => getCommandDetails(signature.value),
      initialValue: null,
    });

    onMounted(() => {
      fetchCommand();
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
        async: !!async.value,
        arguments: args.value.map((u) => ({
          name: u.name,
          value:
            u.value && typeof u.value !== 'string' ? u.value.value : u.value,
        })),
      };

      isSubmitting.value = true;

      response.value = 'Executing...';
      executeCommand(body)
        .then((res) => {
          toast.show({
            variant: 'success',
            title: t('cron:success'),
            body: t('cron:execSuccessMessage'),
          });

          if(body.async){
            router.push(getCommandsLogsUrl());
          } else {
            response.value = res.data.response;
          }
        })
        .catch((e) => {
          response.value = e.message;
          toast.show({
            variant: 'danger',
            title: t('cron:error'),
            body: t('cron:execErrorMessage'),
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
        .map((u) => (u.value && typeof u.value !== 'string' ? u.value.value : u.value))
        .join(' ');
      return _res + _args;
    };

    return {
      origin,
      initialLoading: loading,
      command,
      executeCommandHandler,
      isSubmitting,
      args,
      getInputString,
      response,
      t,
      backUrl: getCommandsListUrl(),
      async
    };
  },
});
</script>

<style scoped lang="scss">
h3{
  margin-bottom: 10px;
}
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
