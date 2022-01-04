<template>
  <page :title="t('pages:commandLogDetails') + (log ? ' ID ' + log.id : '')">
    <div v-if="log">
      <field-value
        :label="t('pages:command')"
        type="text"
        :text="log.signature"
      />
      <field-value
        :label="t('pages:executionTime')"
        type="text"
        :text="log.execution_time + ' ' + t('pages:secondShort')"
      />
      <field-value
        v-if="log.user"
        :label="t('pages:user')"
        type="text"
        :text="log.user ? log.user.name : ''"
      />
      <field-value
        :label="t('pages:status')"
        type="text"
        :text="getStatusLabel(log.status)"
      />
      <field-value
        :label="t('pages:status')"
        type="text"
        :text="getStatusLabel(log.status)"
      />
      <field-value
        v-if="log.created_at"
        :label="t('pages:createdAt')"
        type="text"
        :text="
          new Date(log.created_at).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })
        "
      />
      <div class="arguments_wrap">
        <span class="arguments_title">{{ t('pages:arguments') }}: </span>
        <div>
          <div v-for="(val, key) in log.arguments" :key="key" class="argument">
            <div class="argument_name">{{ key }}:</div>
            <div v-if="val" class="argument_value">{{ val }}</div>
            <div v-else class="argument_null"></div>
          </div>
        </div>
      </div>

      <cron-screen
        v-if="log.output"
        :content="log.output"
        :title="t('pages:outputRes')"
        :use-html="true"
      />
    </div>
  </page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from '@vue/composition-api';

import { useTranslation } from '@tager/admin-ui';
import { Nullable, useResource } from '@tager/admin-services';

import { getCommandLogDetails } from '../../../services/requests';
import { CommandLog } from '../../../typings/model';
import CronScreen from '../../../components/CronScreen';
import { getStatusLabel } from '../../../utils/helper';

export default defineComponent({
  name: 'CommandDetails',
  components: {
    CronScreen,
  },
  setup(props, context) {
    const { t } = useTranslation(context);
    const id = computed<string>(() => context.root.$route.params.id);

    const [fetchPost, { data: log }] = useResource<Nullable<CommandLog>>({
      fetchResource: () => getCommandLogDetails(Number(id.value)),
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
