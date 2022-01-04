<template>
  <div class="wrap">
    <div class="title" v-if="title">{{title}}</div>
    <div :class="['cron_screen', type === 'danger' ? 'danger' : '']" v-if="content">
      <div class="bar">
        <div class="red"></div>
        <div class="yellow"></div>
        <div class="green"></div>
      </div>
      <div class="screen">
        <p class="pre_res">root@127.0.0.1:~$</p>
        <div class="res" v-if="useHtml" v-html="content"></div>
        <div class="res" v-else>
          {{content}}
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
    background-color: #DAD9D9;
    margin: 0 auto;
    font-family: monospace;
    float: none;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .red, .yellow, .green {
    background-color: #E94B35;
    border-radius: 100%;
    width: 15px;
    height: 15px;
    margin-right: 10px;
    position:relative;
  }
  .red {
    margin-left: 10px;
  }
  .yellow {
    background-color: #f0f000;
  }
  .green {
    background-color: #1AAF5C;
  }
  .screen {
    background-color: #33485E;
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
