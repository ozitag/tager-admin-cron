<template>
  <div class="wrap">
    <div v-if="title" class="title">{{ title }}</div>
    <div
      v-if="content"
      :class="['cron_screen', type === 'danger' ? 'danger' : '']"
    >
      <div class="bar">
        <div class="red"></div>
        <div class="yellow"></div>
        <div class="green"></div>
      </div>
      <div class="screen">
        <p class="pre_res">root@127.0.0.1:~$</p>
        <div v-if="useHtml" class="res" v-html="content"></div>
        <div v-else class="res">
          {{ content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CronSelect',
  props: {
    content: {
      type: String,
      required: true,
    },
    useHtml: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  margin: 10px auto;
}
.title {
  font-size: 16px;
  font-weight: 600;
}
.cron_screen {
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;

  .bar {
    text-align: center;
    width: 100%;
    height: 25px;
    background-color: #dad9d9;
    margin: 0 auto;
    font-family: monospace;
    float: none;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .red,
  .yellow,
  .green {
    background-color: #e94b35;
    border-radius: 100%;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    position: relative;
  }
  .red {
    margin-left: 10px;
  }
  .yellow {
    background-color: #f0f000;
  }
  .green {
    background-color: #1aaf5c;
  }
  .screen {
    background-color: #33485e;
    width: 100%;
    min-height: 100px;
    max-height: 450px;
    overflow: hidden;
    overflow-x: scroll;
    overflow-y: scroll;
    border-radius: 0 0 5px 5px;
    margin: 0 auto;
    padding: 1px;
    white-space: pre;
  }

  .pre_res {
    color: #fff;
  }

  color: #fff;
  font-family: monospace;
  font-size: 15px;
  text-align: left;
  position: static;

  &.danger {
    color: #ffea41;
  }
}
</style>
