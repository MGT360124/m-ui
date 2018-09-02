<template>
  <transition :name="disableTransitions ? '' : 'm-zoom-in-center'">
    <span
      class="m-tag"
      :class="[
        type ? 'm-tag--' + type : '',
        tagSize && `m-tag--${tagSize}`,
        {'is-hit': hit}
      ]"
      :style="{backgroundColor: color}">
      <slot></slot>
      <i class="m-tag__close m-icon-close"
        v-if="closable"
        @click.stop="handleClose"></i>
    </span>
  </transition>
</template>
<script>
  export default {
    name: 'MTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String
    },
    methods: {
      handleClose(event) {
        this.$emit('close', event);
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$M || {}).size;
      }
    }
  };
</script>
