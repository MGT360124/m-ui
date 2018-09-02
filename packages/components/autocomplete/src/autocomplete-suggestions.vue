<template>
  <transition name="m-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="m-autocomplete-suggestion m-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region">
      <m-scrollbar
        tag="ul"
        wrap-class="m-autocomplete-suggestion__wrap"
        view-class="m-autocomplete-suggestion__list">
        <li v-if="!parent.hideLoading && parent.loading"><i class="m-icon-loading"></i></li>
        <slot v-else>
        </slot>
      </m-scrollbar>
    </div>
  </transition>
</template>
<script>
  import Popper from 'main/utils/vue-popper';
  import Emitter from 'main/mixins/emitter';
  import MScrollbar from 'main/components/scrollbar';

  export default {
    components: { MScrollbar },
    mixins: [Popper, Emitter],

    componentName: 'MAutocompleteSuggestions',

    data() {
      return {
        parent: this.$parent,
        dropdownWidth: ''
      };
    },

    props: {
      options: {
        default() {
          return {
            gpuAcceleration: false
          };
        }
      },
      id: String
    },

    methods: {
      select(item) {
        this.dispatch('MAutocomplete', 'item-click', item);
      }
    },

    updated() {
      this.$nextTick(_ => {
        this.popperJS && this.updatePopper();
      });
    },

    mounted() {
      this.$parent.popperElm = this.popperElm = this.$el;
      this.referenceElm = this.$parent.$refs.input.$refs.input;
      this.referenceList = this.$el.querySelector('.m-autocomplete-suggestion__list');
      this.referenceList.setAttribute('role', 'listbox');
      this.referenceList.setAttribute('id', this.id);
    },

    created() {
      this.$on('visible', (val, inputWidth) => {
        this.dropdownWidth = inputWidth + 'px';
        this.showPopper = val;
      });
    }
  };
</script>
