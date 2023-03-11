<template>
  <Page :title="t('cron:commandLogDetails') + (log ? ' ID ' + log.id : '')">
    <div v-if="log">
      <FieldValue
        :label="t('cron:command')"
        type="text"
        :value="log.signature"
      />
      <FieldValue :label="t('cron:arguments')">
        <template #value>
          <div v-for="(val, key) in log.arguments" :key="key" class="argument">
            <div class="argument_name">{{ key }}:</div>
            <div v-if="val" class="argument_value">{{ val }}</div>
            <div v-else class="argument_null"></div>
          </div>
        </template>
      </FieldValue>

      <FieldValue
        :label="t('cron:createdAt')"
        type="datetime"
        :value="log.created_at"
      />
      <FieldValue
        :label="t('cron:executionTime')"
        type="text"
        :value="log.execution_time + ' ' + t('cron:secondShort')"
      />
      <FieldValue
        v-if="log.user"
        :label="t('cron:user')"
        type="text"
        :value="log.user ? log.user.name : ''"
      />
      <FieldValue
        :label="t('cron:status')"
        type="text"
        :value="getStatusLabel(log.status)"
      />

      <CronScreen
        v-if="log.output"
        :content="log.output"
        :title="t('cron:outputRes')"
        :use-html="true"
      />
    </div>
  </Page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { FieldValue } from '@tager/admin-ui';
import { Nullable, useI18n, useResource } from '@tager/admin-services';
import { Page } from '@tager/admin-layout';

import { getCommandLogDetails } from '../../../services/requests';
import { CommandLog } from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import { getStatusLabel } from '../../../utils/helper';

export default defineComponent({
  name: 'CommandLogDetails',
  components: {
    FieldValue,
    Page,
    CronScreen,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();

    const id = computed<string>(() => route.params.id as string);

    const [fetchPost, { data: log }] = useResource<Nullable<CommandLog>>({
      fetchResource: () => getCommandLogDetails(Number(id.value)),
      initialValue: null,
      resourceName: 'Command Log',
    });

    onMounted(() => {
      fetchPost();
    });

    return {
      origin,
      getStatusLabel,
      log,
      t,
    };
  },
});
</script>

<style scoped lang="scss">
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

.arguments_title {
  margin-bottom: 14px;
  display: block;
}

.arguments_wrap {
  margin-bottom: 20px;
}

.argument {
  display: flex;
  margin: 0px 5px 5px 0px;
  font-size: 14px;

  .argument_name {
    background: #666;
    border-radius: 4px 0px 0px 4px;
    min-width: 100px;
    text-align: right;
    padding: 4px 8px;
    color: #fff;
  }

  .argument_value {
    background: #ececec;
    padding: 4px 8px;
    border-radius: 0px 4px 4px 0px;
    display: block;
    white-space: pre-wrap;
    overflow: hidden;
    overflow-wrap: break-word;
    min-width: 150px;
  }

  .argument_null {
    background: #fcc;
    padding: 2px;
    border-radius: 0px 4px 4px 0px;
  }
}
</style>
