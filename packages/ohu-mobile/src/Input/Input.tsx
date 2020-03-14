import { defineComponent, props } from '../_utils/defineComponent';
import { InputProps, InputEvents, InputBlurEvent, InputFocusEvent, InputChangeEvent } from './types';
import directive from './directive';
import { IconDef } from '../types';
import { IconProps } from '../Icon';
import { getIcon } from '../_utils/icon-utils';
import Button from '../Button';
import { CloseCircleFilled, EyeCloseOutlined, EyeOutlined } from '@ohu-mobile/icons';
import { VNodeData, VNode } from 'vue/types/umd';
import { BlockContext } from '../_utils/classHelper';
import { fieldMixin } from '../Form/fieldMixin';
import { FormFieldInnerMethods } from '../Form/types';


interface InputMethods extends FormFieldInnerMethods {
  stateValue: any;
  showPassword: boolean;
  isInputFocus: boolean;
  // renderInput: () => JSX.Element;
  renderTextArea: () => JSX.Element;
  getAdornment: (adornment?: IconDef | IconProps | string) => VNode | undefined;
  handleFocus: (e: InputFocusEvent) => void;
  handleBlur: (e: InputFocusEvent) => void;
  handleChange: (e: InputChangeEvent) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  togglePassword: (e: Event) => void;
  clear: (e: Event) => void;
}

export default defineComponent<InputProps, InputEvents, {}, InputMethods>('input')
  .mixin(fieldMixin)
  .create({
    model: {
      prop: 'value',
      event: 'valueChange',
    },
    props: {
      name: props(String).optional,
      type: props(String).default('text'),
      outline: props(Boolean).default(false),
      value: props.ofAny().optional,
      allowClear: props(Boolean).default(false),
      allowTogglePassword: props(Boolean).default(true),
      noBorder: props(Boolean).default(false),
      disabled: props(Boolean).default(false),
      readonly: props(Boolean).default(false),
      placeholder: props(String).default(''),
      startAdornment: props<IconDef, IconProps, string>(Object, Object, String).optional,
      endAdornment: props<IconDef, IconProps, string>(Object, Object, String).optional,
      max: props(String, Number).optional,
      min: props(String, Number).optional,
      maxlength: props(String, Number).optional,
      minlength: props(String, Number).optional,
      multiple: props(Boolean).optional,
      tabindex: props(String, Number).optional,
      step: props(String, Number).optional,
      size: props(String, Number).optional,
      required: props(Boolean).default(false),
      pattern: props(String).optional,
      accept: props(String, Number).optional,
      autocomplete: props(String).optional,
      autofocus: props(Boolean).default(false),
      autosave: props(String).optional,
      rows: props(String, Number).optional,
      cols: props(String, Number).optional,
    },
    directives: {
      inputBase: directive,
    },
    watch: {
      value(cur) {
        this.stateValue = cur;
      },
    },
    data() {
      return {
        stateValue: this.getFieldValue(this.value),
        showPassword: false,
        isInputFocus: false,
      };
    },
    methods: {
      resetFieldValue(value: any) {
        this.stateValue = value;
      },
      togglePassword(e: Event) {
        e.stopPropagation();
        this.showPassword = !this.showPassword;
      },
      clear(e: Event) {
        e.stopPropagation();
        const input = this.$refs.input as HTMLInputElement;
        if (input) {
          input.value = '';
        }
        this.stateValue = '';
        this.$emit('valueChange', this.stateValue);
        this.$emit('change', this.stateValue);
        this.$emit('clear');
      },
      focus() {
        const input = this.$refs.input as HTMLInputElement;
        input && input.focus();
      },
      blur() {
        const input = this.$refs.input as HTMLInputElement;
        input && input.blur();
      },
      handleBlur(e: InputBlurEvent) {
        this.isInputFocus = false;
        this.$emit('blur', e);
      },
      handleFocus(e: InputFocusEvent) {
        this.isInputFocus = true;
        this.$emit('focus', e);
      },
      handleChange(e: InputChangeEvent) {
        const target = e.target;
        if (!target) return;
        this.stateValue = target.value;
        if (!target.composing) {
          this.$emit('valueChange', this.stateValue);
        }
        this.$emit('change', e);
        this.$emit('input', e);
      },
      handleKeyDown(e: KeyboardEvent) {
        this.$emit('keydown', e);
        if (e.keyCode === 13) {
          e.preventDefault();
          this.$emit('enter', e);
        }
      },
      getAdornment(adornment?: IconDef | IconProps | string) {
        if (!adornment) return;
        if (typeof adornment === 'string') {
          return (
            <span>{adornment}</span>
          );
        } else {
          return getIcon(this.$createElement, adornment);
        }
      },
      renderInput(root: BlockContext, attrs: Record<string, any>) {
        let {
          type,
          allowClear,
          allowTogglePassword,
          startAdornment,
          endAdornment,
        } = this;
        let start = this.getAdornment(startAdornment);
        if (start) {
          start = (
            <div class={root.element('adornment')}>{start}</div>
          );
        }
        let end;
        if (this.$slots.endAdornment) {
          end = (
            <div class={root.element('adornment').is('auto')}>{this.$slots.endAdornment}</div>
          );
        } else {
          end = this.getAdornment(endAdornment);
          if (end) {
            end = (
              <div class={root.element('adornment')}>{end}</div>
            );
          }
        }
        const inputType = this.showPassword ? 'text' : type;
        const inputProps: VNodeData = {
          domProps: {
            value: this.stateValue,
            type: inputType,
          },
          class: root.element('base'),
          attrs,
          on: {
            ...this.$listeners,
            focus: this.handleFocus,
            blur: this.handleBlur,
            input: this.handleChange,
            keydown: this.handleKeyDown,
          },
          directives: [{ name: 'inputBase' }],
          ref: 'input',
        }
        if (this.type === 'textarea') {
          return <textarea {...inputProps}></textarea>
        }
        return [
          start,
          <input {...inputProps} />,
          end,
          allowClear
          && !this.readonly
          && !this.disabled
          &&
          <div class={root.element('adornment').is('button')} tabindex={-1}>
            {
              this.stateValue
              &&
              <Button
                tabindex={-1}
                link size="md"
                round
                icon={CloseCircleFilled}
                onClick={this.clear} />
            }
          </div>,
          type === 'password'
          &&
          allowTogglePassword
          &&
          <div class={root.element('adornment').is('button')} tabindex={-1}>
            <Button
              tabindex={-1}
              link
              size="md"
              round
              icon={this.showPassword ? EyeOutlined : EyeCloseOutlined}
              onClick={this.togglePassword} />
          </div>,
        ];
      },
    },
    mounted() {
      if (this.autofocus) {
        this.focus();
      }
    },
    render() {
      const root = this.root();
      let {
        type,
        value,
        outline,
        allowClear,
        allowTogglePassword,
        startAdornment,
        endAdornment,
        noBorder,
        autofocus,
        name,
        ...attrs
      } = this.$props;
      if (attrs) {
        attrs.name = this.fieldName || name;
      }
      return (
        <div class={root
          .has([this.startAdornment && 'start-adornment', !this.noBorder && 'border'])
          .is([
            this.isInputFocus && 'focus',
            this.outline ? 'outline' : 'normal',
            this.disabled && 'disabled',
          ])}>
          {this.renderInput(root, attrs)}
        </div>
      );
    },
  });

