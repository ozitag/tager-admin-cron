<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { useTranslation } from '@tager/admin-ui';
import { MenuItemType } from '@tager/admin-layout';

import { getCommandsListUrl, getCommandsLogs, getCronLogsUrl } from "../utils/paths";

export default defineComponent({
  name: 'App',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: 'cron',
        text: t('pages:cron'),
        icon: 'viewList',
        children: [
          {
            text: t('pages:commands'),
            url: getCommandsListUrl(),
          },
          {
            text: t('pages:commandsLogs'),
            url: getCommandsLogs(),
          },
          { text: t('pages:cronLogs'), url: getCronLogsUrl() },
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
