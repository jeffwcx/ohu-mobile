import { componentFactoryOf } from 'vue-tsx-support';
import props from 'vue-strict-prop';
import { prefix } from '../_utils/shared';
import './styles/field.scss';
import { cloneElement, getVModelOption } from '../_utils/vnode';
import Form from './Form';
import { Schema } from 'yup';

const baseFormFieldName = `${prefix}form-field`;
const formFieldLabelCls = `${baseFormFieldName}__label`;
const formFieldControlCls = `${baseFormFieldName}__control`;
export default componentFactoryOf().mixin({
  inject: {
    parent: {
      from: 'form',
      default: null,
    },
  },
  data() {
    const instance = this as any;
    return {
      form: instance.parent,
    } as {
      form?: InstanceType<typeof Form>
    };
  },
}).create({
  name: baseFormFieldName,
  props: {
    initialValue: props.ofType().optional,
    label: props(String).optional,
    name: props(String).optional,
  },
  data() {
    return {
      selfValue: this.initialValue,
    } as {
      selfValue: any;
    };
  },
  computed: {
    valueState() {
      // why??
      const instance = this as any;
      if (this.form && this.name) {
        return this.form.getFieldValue(this.name)
      }
      return instance.selfValue;
    },
    schema() {
      if (this.name) {
        return this.form?.getFieldValidation(this.name) as Schema<any>;
      }
      return;
    },
    error() {
      if (this.name) {
        return this.form?.errors[this.name];
      }
    },
  },
  methods: {
    async validate() {
      if (this.form && this.name && this.schema) {
        return this.schema.validate(this.valueState);
      } else {
        return this.valueState;
      }
    },
  },
  mounted() {
    this.form?.children.push(this);
  },
  render() {
    const { $slots, label, name, valueState } = this;
    let component = $slots.default && $slots.default[0];
    if (component) {
      const { event, prop } = getVModelOption(component);
      component = cloneElement(component, {
        props: { name, [prop]: valueState },
        on: {
          [event]: (value: any) => {
            if (this.form && name) {
              this.form.setFieldValue(name, value);
            } else {
              this.selfValue = value;
            }
          },
        },
      });
    }
    return (
      <div class={baseFormFieldName}>
        { label && <label class={formFieldLabelCls} for={name}>{label}</label> }
        { component && <div class={formFieldControlCls}>{ component }</div> }
      </div>
    );
  },
});
