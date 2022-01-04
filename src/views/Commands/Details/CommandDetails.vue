<template>
  <page :title="t('pages:cronLogs')">
    <div v-if="log">
      <div>
        <span>{{ t('pages:command') }}: </span>
        <b>{{log.signature}}</b>
      </div>
      <div>
        <span>{{ t('pages:arguments') }}: </span>
        <div>
          <div v-for="(val, key) in log.arguments" :key="key" class="argument">
            <div class="argument_name">{{ key }}:</div>
            <div v-if="val" class="argument_value">{{ val }}</div>
            <div v-else class="argument_null"></div>
          </div>
        </div>
      </div>
      <div>
        <span>{{ t('pages:executionTime') }}: </span>
        <b>{{log.execution_time}}</b>
      </div>
      <div>
        <span>{{ t('pages:user') }}: </span>
        <b>{{log.user ? log.user.name : ''}}</b>
      </div>
      <div>
        <span>{{ t('pages:createdAt') }}: </span>
        <b v-if="log.created_at">{{ (new Date(log.created_at)).toLocaleDateString('ru-RU', {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }) }}</b>
      </div>
      <div>
        <b v-if="log.status" :class="['status', getStatusLabel(log.status)]">{{getStatusLabel(log.status)}}</b>
      </div>

      <cron-screen v-if="log.output" :content="log.output" title="Output:" :useHtml="true" />
    </div>
  </page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from '@vue/composition-api';

import {
  useTranslation,
} from '@tager/admin-ui';
import { useResource } from '@tager/admin-services';

import {getCommandLogDetails, getCronLogDetails} from '../../../services/requests';
import {CommandLog, CronLog} from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import {getStatusLabel} from "../../../utils/helper";

export default defineComponent({
  name: 'CommandDetails',
  components: {
    CronScreen,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
    const id = computed<number>(() => context.root.$route.params.id);

    const [fetchPost, { data: log }] = useResource<
        Nullable<CommandLog>
        >({
      fetchResource: () => getCommandLogDetails(id.value),
      initialValue: null,
      context,
      resourceName: 'Post',
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
.argument {
  display: flex;
  margin: 0px 5px 5px 0px;
  font-size: 12px;

  .argument_name {
    background: #33485e;
    color: #fff;
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
