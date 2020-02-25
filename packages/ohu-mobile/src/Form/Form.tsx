import Vue from 'vue';
import { FormEvents, FormScopedSlots, FormProps, FormAlign, FormTrigger } from './types';
import { SyntheticEvent, FormHTMLAttributes } from 'vue-tsx-support/types/dom';
import deepmerge from 'deepmerge';
import { ObjectSchemaDefinition } from 'yup';
import { FormError } from './FormError';
import { defineAncestorComponent, props } from '../_utils/defineComponent';
import { CombinedVueInstance } from 'vue/types/vue';

type DescendantType = CombinedVueInstance<Vue, {}, {
  validate: () => Promise<Record<string, any>>;
  innerValidate: () => Promise<Record<string, any>>;
}, {}, {}>;

export default defineAncestorComponent<FormProps, FormEvents, FormScopedSlots>('form').create({
  props: {
    initialValues: props(Object).default(() => ({})),
    validateSchema: props<ObjectSchemaDefinition<Record<string, any>>>(Object).optional,
    validateFirst: props(Boolean).default(false),
    inline: props(Boolean).default(true),
    labelAlign: props.ofType<FormAlign>().optional,
    labelWidth: props(String).optional,
    contentAlign: props.ofType<FormAlign>().optional,
    trigger: props.ofType<FormTrigger>().default('change'),
  },
  data() {
    return {
      model: deepmerge({}, this.initialValues),
      errors: {},
      children: [],
    } as {
      model: Record<string, any>,
      errors: any,
      children: DescendantType[],
    };
  },
  methods: {
    reset() {
      this.model = deepmerge({}, this.initialValues);
      this.errors = {};
    },
    addError(name: string, error: Error) {
      this.$set(this.errors, name, error);
    },
    removeError(name: string) {
      if (this.errors[name]) {
        this.$delete(this.errors, name);
      }
    },
    addFormField(field: DescendantType) {
      if (this.children.indexOf(field) < 0) {
        this.children.push(field);
      }
    },
    removeFormField(field: DescendantType) {
      const index = this.children.indexOf(field);
      if (index >= 0) {
        this.children.splice(index, 1);
      }
    },
    // 👇 open api
    validateField(name: string) {
      const child = this.children.find((item) => item.$props.name === name);
      if (child) {
        return child.innerValidate();
      } else {
        return Promise.resolve(this.model[name]);
      }
    },
    validate() {
      this.errors = {};
      const validatingChildren = this.children
        .filter((child) => child.$props.name !== undefined);
      const tasks = validatingChildren.map((component) => {
        const name = component.$props.name;
        return [name, () => component.validate()];
      });
      const doTask = () => {
        // using serial running
        const result: Record<string, any> = {};
        let p: Promise<Record<string, any>> = Promise.resolve(result);
        let hasEmit = false;
        let isEmpty = true;
        tasks.forEach(([name, func]) => {
          p = p.then((r) => {
            return Promise.all([r, name, func()]);
          }).then(([r, n, value]) => {
            r[n] = value;
            return r;
          }).catch((error) => {
            if (this.validateFirst && hasEmit) throw error;
            this.addError(name, error);
            isEmpty = false;
            if (this.validateFirst) {
              hasEmit = true;
              throw new FormError(this.errors);
            }
            return result;
          });
        });
        if (!this.validateFirst) {
          p = p.then((r) => {
            if (isEmpty) {
              return r;
            } else {
              throw new FormError(this.errors);
            }
          });
        }
        return p;
      };
      return doTask();
    },
    getFieldValidation(name: string) {
      if (this.validateSchema) return this.validateSchema[name];
    },
    getFieldValue(name: string) {
      return this.model[name];
    },
    setFieldValue(name: string, value: any) {
      this.$set(this.model, name, value);
      this.$emit('valuesChange', { prop: name, value, allValues: this.model });
    },
    validateAndScroll() {},
    // 👆 open api
    handleSubmit(e: SyntheticEvent<FormHTMLAttributes, Event>) {
      e.preventDefault();
      return false;
    },
  },
  render() {
    const root = this.root();
    const {
      $scopedSlots,
      model,
      reset,
      validate,
      handleSubmit,
      errors
    } = this;
    return (
      <form class={root} onSubmit={handleSubmit}>
        {
          $scopedSlots.default &&
          $scopedSlots.default({
            errors,
            model,
            reset,
            validate,
          })
        }
      </form>
    );
  },
});
