<template>
  <page :title="t('pages:commandLogDetails') + (log ? ' ID ' + log.id : '')">
    <div v-if="log">
      <field-value
        :label="t('pages:command')"
        type="text"
        :text="log.command"
      />
      <field-value :label="t('pages:class')" type="text" :text="log.class" />
      <field-value
        :label="t('pages:beginAt')"
        type="text"
        :text="
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
      <field-value
        :label="t('pages:endAt')"
        type="text"
        :text="
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
      <field-value
        :label="t('pages:status')"
        type="text"
        :text="getStatusLabel(log.status)"
      />

      <cron-screen
        v-if="log.output"
        :content="log.output"
        :title="t('pages:outputRes')"
      />
      <cron-screen
        v-if="log.error"
        :content="log.error"
        type="danger"
        :title="t('pages:outputError')"
      />
    </div>
  </page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@vue/composition-api';

import { useTranslation } from '@tager/admin-ui';
import { Nullable, useResource } from '@tager/admin-services';

import { getCronLogDetails } from '../../../services/requests';
import { CronLog } from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import { getStatusLabel } from '../../../utils/helper';

export default defineComponent({
  name: 'CronDetails',
  components: {
    CronScreen,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
    const id = computed<string>(() => context.root.$route.params.id);

    const [fetchPost, { data: log }] = useResource<Nullable<CronLog>>({
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
