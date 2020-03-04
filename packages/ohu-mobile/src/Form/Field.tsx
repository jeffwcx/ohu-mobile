import { cloneElement, getVModelOption } from '../_utils/vnode';
import Form from './Form';
import { Schema } from 'yup';
import { defineDescendantComponent, props } from '../_utils/defineComponent';
import { FormFieldProps, FormAlign, FormTrigger } from './types';

export default defineDescendantComponent<InstanceType<typeof Form>, FormFieldProps>(
  'form',
  'form-field',
).create({
  props: {
    initialValue: props.ofAny().optional,
    label: props(String).optional,
    name: props(String).optional,
    labelAlign: props.ofType<FormAlign>().optional,
    labelWidth: props(String).default('25.6%'),
    contentAlign: props.ofType<FormAlign>().optional,
    trigger: props.ofType<FormTrigger>().optional,
  },
  data() {
    return {
      stateValue: this.initialValue,
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
    getValueState() {
      if (this.ancestor && this.name) {
        return this.ancestor.getFieldValue(this.name)
      }
      return this.stateValue;
    },
    innerValidate() {
      return this.validate()
        .then((value) => {
          if (this.name) {
            this.ancestor.removeError(this.name);
          }
          return value;
        })
        .catch((error) => {
          if (this.name) {
            this.ancestor.addError(this.name, error);
          }
        });
    },
    validate() {
      let value = this.getValueState();
      if (this.ancestor && this.name && this.schema) {
        return this.schema.validate(value);
      } else {
        return Promise.resolve(value);
      }
    },
  },
  mounted() {
    if (this.ancestor) {
      this.ancestor.addFormField(this);
      this.$once('hook:beforeDestroyed', () => {
        if (this.ancestor) {
          this.ancestor.removeFormField(this);
        }
      });
    }
  },
  render() {
    const root = this.root();
    const {
      $slots,
      error, triggerEvent,
      label, name, labelAlign, labelWidth, contentAlign,
    } = this;
    let component = $slots.default && $slots.default[0];
    if (component) {
      const { event, prop } = getVModelOption(component);
      // Todo: Sometimes Blur event may triggered by deeper component, so this is a temporary plan.
      component = cloneElement(component, {
        props: { name, [prop]: this.getValueState() },
        on: {
          [event]: (value: any) => {
            if (this.ancestor && name) {
              this.ancestor.setFieldValue(name, value);
            } else {
              this.stateValue = value;
            }
            if (triggerEvent === 'change') {
              this.innerValidate();
            }
          },
          blur: () => {
            if (triggerEvent === 'blur') {
              this.innerValidate();
            }
          },
        },
      });
    }
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
          component
          &&
          <div class={controlClass}>
            {component}
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

