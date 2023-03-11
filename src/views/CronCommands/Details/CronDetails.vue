<template>
  <Page :title="t('cron:commandLogDetails') + (log ? ' ID ' + log.id : '')">
    <div v-if="log">
      <FieldValue :label="t('cron:command')" type="text" :value="log.command" />
      <FieldValue :label="t('cron:class')" type="text" :value="log.class" />
      <FieldValue
        :label="t('cron:beginAt')"
        type="text"
        :value="
          new Date(log.begin_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })
        "
      />
      <FieldValue
        :label="t('cron:endAt')"
        type="text"
        :value="
          new Date(log.end_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })
        "
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
      />
      <cron-screen
        v-if="log.error"
        :content="log.error"
        type="danger"
        :title="t('cron:outputError')"
      />
    </div>
  </Page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { Nullable, useI18n, useResource } from '@tager/admin-services';
import { Page } from '@tager/admin-layout';
import { FieldValue } from '@tager/admin-ui';

import { getCronLogDetails } from '../../../services/requests';
import { CronLog } from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import { getStatusLabel } from '../../../utils/helper';

export default defineComponent({
  name: 'CronDetails',
  components: {
    FieldValue,
    Page,
    CronScreen,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();

    const id = computed<string>(() => route.params.id as string);

    const [fetchPost, { data: log }] = useResource<Nullable<CronLog>>({
      fetchResource: () => getCronLogDetails(Number(id.value)),
      initialValue: null,
      resourceName: 'Cron Details',
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
