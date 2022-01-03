<template>
  <select class="select" @change="onChange">
    <option></option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts">
export default {
  name: 'CronSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onChange(e: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--input-color);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid var(--input-border-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 10px;
}
</style>
