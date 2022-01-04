<template>
  <page :title="t('pages:cronLogs')">
    <div v-if="log">
      <div>
        <span>{{ t('pages:command') }}: </span>
        <b>{{log.command}}</b>
      </div>
      <div>
        <span>{{ t('pages:class') }}: </span>
        <b>{{log.class}}</b>
      </div>
      <div>
        <span>{{ t('pages:beginAt') }}: </span>
        <b v-if="log.begin_at">{{ (new Date(log.begin_at)).toLocaleDateString('ru-RU', {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }) }}</b>
      </div>
      <div>
        <span>{{ t('pages:endAt') }}: </span>
        <b v-if="log.end_at">{{ (new Date(log.end_at)).toLocaleDateString('ru-RU', {
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

      <cron-screen v-if="log.output" :content="log.output" title="Output:"/>
      <cron-screen v-if="log.error" :content="log.error" type="danger" title="Error:"/>
    </div>
  </page>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted} from '@vue/composition-api';

import {
  useTranslation,
} from '@tager/admin-ui';
import {Nullable, useResource} from '@tager/admin-services';

import { getCronLogDetails } from '../../../services/requests';
import { CronLog } from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import {getStatusLabel} from "../../../utils/helper";

export default defineComponent({
  name: 'CronDetails',
  components: {
    CronScreen,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
    const id = computed<string>(() => context.root.$route.params.id);

    const [fetchPost, { data: log }] = useResource<
      Nullable<CronLog>
    >({
      fetchResource: () => getCronLogDetails(Number(id.value)),
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
</style>
