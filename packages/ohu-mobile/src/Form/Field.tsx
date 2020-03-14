import Form from './Form';
import { Schema } from 'yup';
import { defineDescendantComponent, props } from '../_utils/defineComponent';
import { FormFieldProps, FormAlign, FormTrigger, FormFieldInput, FormFieldInnerMethods } from './types';
import { getVModelOption } from '../_utils/vnode';

export default defineDescendantComponent<InstanceType<typeof Form>, FormFieldProps, {}, {}, FormFieldInnerMethods>(
  'form',
  'form-field',
).create({
  provide() {
    return {
      'form-field': this,
    };
  },
  props: {
    initialValue: props.ofAny().optional,
    label: props(String).optional,
    name: props(String).optional,
    labelAlign: props.ofType<FormAlign>().optional,
    labelWidth: props(String).default('25.6%'),
    contentAlign: props.ofType<FormAlign>().optional,
    trigger: props.ofType<FormTrigger>().optional,
  },
  watch: {
    fieldValue(cur) {
      if (this.ancestor && this.name) {
        this.ancestor.setFieldValue(this.name, cur);
      }
      if (this.triggerEvent === 'change') {
        this.validate();
      }
    },
  },
  data() {
    if (this.initialValue !== undefined && this.ancestor) {
      this.ancestor.setFieldValue(this.name, this.initialValue);
    }
    return {
      fieldValue: this.name ? this.ancestor.getFieldValue(this.name) : '',
      children: null as FormFieldInput | null,
      otherChildren: [] as FormFieldInput[],
    };
  },
  computed: {
    schema() {
      if (this.name) {
        return this.ancestor?.getFieldValidation(this.name) as Schema<any>;
      }
      return;
    },
    error() {
      if (this.name) {
        return this.ancestor?.errors[this.name];
      }
    },
    triggerEvent() {
      return this.trigger || this.ancestor.trigger;
    },
  },
  methods: {
    validate() {
      return this.formValidate()
        .then((value) => {
          if (this.name && this.ancestor) {
            this.ancestor.removeError(this.name);
          }
          return value;
        })
        .catch((error) => {
          if (this.name && this.ancestor) {
            this.ancestor.addError(this.name, error);
          }
        });
    },
    resetField(value: any) {
      this.fieldValue = value;
      if (this.children && this.children.resetFieldValue) {
        this.children.resetFieldValue(this.initialValue || value);
      }
    },
    formValidate() {
      let value = this.fieldValue;
      if (this.ancestor && this.name && this.schema) {
        return this.schema.validate(value);
      } else {
        return Promise.resolve(value);
      }
    },
    onBlur() {
      if (this.triggerEvent === 'blur') {
        this.validate();
      }
    },
    addChildren(input: FormFieldInput) {
      if (this.children) {
        this.otherChildren.push(input);
      } else {
        this.children = input;
        const { event } = getVModelOption(this.children.$vnode);
        this.children.$on(event, (value: any) => {
          this.fieldValue = value;
        });
      }
      input.$on('blur', () => {
        this.onBlur();
      });
    },
    removeChildren(input?: FormFieldInput) {
      if (this.children === input) {
        this.children = null;
        return;
      }
      if (input) {
        this.otherChildren = this.otherChildren.filter(item => item !== input);
      }
    },
  },
  mounted() {
    if (this.ancestor) {
      this.ancestor.addFormField(this);
      this.$once('hook:beforeDestroy', () => {
        if (this.ancestor) {
          this.ancestor.removeFormField(this);
        }
      });
    }
  },
  render() {
    const root = this.root();
    const {
      $slots, error,
      label, name, labelAlign, labelWidth, contentAlign,
    } = this;
    if (this.ancestor) {
      root.is([this.ancestor.inline ? 'inline' : 'block']);
    }
    const labelClass = root.element('label');
    const align = labelAlign || this.ancestor.labelAlign;
    if (align) {
      labelClass.is(align);
    }
    const labelStyle = {
      width: labelWidth || this.ancestor.labelWidth,
    };
    const controlClass = root.element('control');
    const controlAlign = contentAlign || this.ancestor.contentAlign;
    if (controlAlign) {
      controlClass.is(controlAlign);
    }
    return (
      <div class={root.has([error && 'error'])}>
        { label && <label class={labelClass} style={labelStyle} for={name}>{label}</label> }
        {
          $slots.default
          &&
          <div class={controlClass}>
            {$slots.default}
            {
              error
              &&
              <div class={controlClass.element('error')}>
                <span>{error.message}</span>
              </div>
            }
          </div>
        }
      </div>
    );
  },
});

