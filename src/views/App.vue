<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { useTranslation } from '@tager/admin-ui';
import { MenuItemType } from '@tager/admin-layout';

import { PAGES_ROUTE_PATHS } from '../constants/paths';

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
            url: PAGES_ROUTE_PATHS.PAGE_COMMANDS,
          },
          {
            text: t('pages:commandsLogs'),
            url: PAGES_ROUTE_PATHS.PAGE_COMMANDS_LOGS,
          },
          { text: t('pages:cronLogs'), url: PAGES_ROUTE_PATHS.PAGE_CRON_LOGS },
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
