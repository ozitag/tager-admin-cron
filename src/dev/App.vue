<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { MenuItemType, PageLayout } from '@tager/admin-layout';
import { ViewListIcon } from '@tager/admin-ui';
import { useI18n } from '@tager/admin-services';

import {
  getCommandsListUrl,
  getCommandsLogsUrl,
  getCronLogsUrl,
} from '../utils/paths';

export default defineComponent({
  name: 'App',
  components: {
    PageLayout,
  },
  setup() {
    const { t } = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: 'cron',
        text: t('cron:cron'),
        icon: ViewListIcon,
        children: [
          {
            text: t('cron:commands'),
            url: getCommandsListUrl(),
          },
          {
            text: t('cron:commandsLogs'),
            url: getCommandsLogsUrl(),
          },
          {
            text: t('cron:cronLogs'),
            url: getCronLogsUrl(),
          },
        ],
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
