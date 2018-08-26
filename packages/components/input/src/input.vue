<template>
  <div :class="[
    type === 'textarea' ? 'm-textarea' : 'm-input',
    inputSize ? 'm-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      'm-input-group': $slots.prepend || $slots.append,
      'm-input-group--append': $slots.append,
      'm-input-group--prepend': $slots.prepend,
      'm-input--prefix': $slots.prefix || prefixIcon,
      'm-input--suffix': $slots.suffix || suffixIcon || clearable
    }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="m-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        v-if="type !== 'textarea'"
        class="m-input__inner"
        v-bind="$attrs"
        :type="type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete"
        :value="currentValue"
        ref="input"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      >
      <!-- 前置内容 -->
      <span class="m-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="m-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        class="m-input__suffix"
        v-if="$slots.suffix || suffixIcon || showClear || validateState && needStatusIcon">
        <span class="m-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <i class="m-input__icon"
              v-if="suffixIcon"
              :class="suffixIcon">
            </i>
          </template>
          <i v-else
            class="m-input__icon m-icon-circle-close m-input__clear"
            @click="clear"
          ></i>
        </span>
        <i class="m-input__icon"
          v-if="validateState"
          :class="['m-input__validateIcon', validateIcon]">
        </i>
      </span>
      <!-- 后置元素 -->
      <div class="m-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="m-textarea__inner"
      :value="currentValue"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
  </div>
</template>
<script>
  import emitter from '../../../mixins/emitter';
  import Migrating from '../../../mixins/migrating';
  import calcTextareaHeight from './calcTextareaHeight';
  import merge from '../../../utils/merge';
  import { isKorean } from '../../../utils/shared';

  export default {
    name: 'MInput',

    componentName: 'MInput',

    mixins: [emitter, Migrating],

    inheritAttrs: false,

    inject: {
      mForm: {
        default: ''
      },
      mFormItem: {
        default: ''
      }
    },

    data() {
      return {
        currentValue: this.value === undefined || this.value === null
          ? ''
          : this.value,
        textareaCalcStyle: {},
        hovering: false,
        focused: false,
        isOnComposition: false,
        valueBeforeComposition: null
      };
    },

    props: {
      value: [String, Number],
      size: String,
      resize: String,
      form: String,
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autosize: {
        type: [Boolean, Object],
        default: false
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      prefixIcon: String,
      label: String,
      clearable: {
        type: Boolean,
        default: false
      },
      tabindex: String
    },

    computed: {
      _mFormItemSize() {
        return (this.mFormItem || {}).mFormItemSize;
      },
      validateState() {
        return this.mFormItem ? this.mFormItem.validateState : '';
      },
      needStatusIcon() {
        return this.mForm ? this.mForm.statusIcon : false;
      },
      validateIcon() {
        return {
          validating: 'm-icon-loading',
          success: 'm-icon-circle-check',
          error: 'm-icon-circle-close'
        }[this.validateState];
      },
      textareaStyle() {
        return merge({}, this.textareaCalcStyle, { resize: this.resize });
      },
      inputSize() {
        return this.size || this._mFormItemSize || (this.$M || {}).size;
      },
      inputDisabled() {
        return this.disabled || (this.mForm || {}).disabled;
      },
      showClear() {
        return this.clearable &&
          !this.disabled &&
          !this.readonly &&
          this.currentValue !== '' &&
          (this.focused || this.hovering);
      }
    },

    watch: {
      value(val, oldValue) {
        this.setCurrentValue(val);
      }
    },

    methods: {
      focus() {
        (this.$refs.input || this.$refs.textarea).focus();
      },
      blur() {
        (this.$refs.input || this.$refs.textarea).blur();
      },
      getMigratingConfig() {
        return {
          props: {
            'icon': 'icon is removed, use suffix-icon / prefix-icon instead.',
            'on-icon-click': 'on-icon-click is removed.'
          },
          events: {
            'click': 'click is removed.'
          }
        };
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        if (this.validateEvent) {
          this.dispatch('mFormItem', 'm.form.blur', [this.currentValue]);
        }
      },
      select() {
        (this.$refs.input || this.$refs.textarea).select();
      },
      resizeTextarea() {
        if (this.$isServer) return;
        const { autosize, type } = this;
        if (type !== 'textarea') return;
        if (!autosize) {
          this.textareaCalcStyle = {
            minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
          };
          return;
        }
        const minRows = autosize.minRows;
        const maxRows = autosize.maxRows;

        this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
      },
      handleComposition(event) {
        if (event.type === 'compositionend') {
          this.isOnComposition = false;
          this.currentValue = this.valueBeforeComposition;
          this.valueBeforeComposition = null;
          this.handleInput(event);
        } else {
          const text = event.target.value;
          const lastCharacter = text[text.length - 1] || '';
          this.isOnComposition = !isKorean(lastCharacter);
          if (this.isOnComposition && event.type === 'compositionstart') {
            this.valueBeforeComposition = text;
          }
        }
      },
      handleInput(event) {
        const value = event.target.value;
        this.setCurrentValue(value);
        if (this.isOnComposition) return;
        this.$emit('input', value);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
      },
      setCurrentValue(value) {
        if (this.isOnComposition && value === this.valueBeforeComposition) return;
        this.currentValue = value;
        if (this.isOnComposition) return;
        this.$nextTick(this.resizeTextarea);
        if (this.validateEvent && this.currentValue === this.value) {
          this.dispatch('mFormItem', 'm.form.change', [value]);
        }
      },
      calcIconOffset(place) {
        let mList = [].slice.call(this.$m.querySelectorAll(`.m-input__${place}`) || []);
        if (!mList.length) return;
        let m = null;
        for (let i = 0; i < mList.length; i++) {
          if (mList[i].parentNode === this.$m) {
            m = mList[i];
            break;
          }
        }
        if (!m) return;
        const pendantMap = {
          suffix: 'append',
          prefix: 'prepend'
        };

        const pendant = pendantMap[place];
        if (this.$slots[pendant]) {
          m.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$m.querySelector(`.m-input-group__${pendant}`).offsetWidth}px)`;
        } else {
          m.removeAttribute('style');
        }
      },
      updateIconOffset() {
        this.calcIconOffset('prefix');
        this.calcIconOffset('suffix');
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
        this.setCurrentValue('');
        this.focus();
      }
    },

    created() {
      this.$on('inputSelect', this.select);
    },

    mounted() {
      this.resizeTextarea();
      this.updateIconOffset();
    },

    updated() {
      this.$nextTick(this.updateIconOffset);
    }
  };
</script>
