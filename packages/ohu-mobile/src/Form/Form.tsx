import { componentFactoryOf } from 'vue-tsx-support';
import { VueConstructor } from 'vue';
import props from 'vue-strict-prop';
import { FormEvents, FormScopedSlots } from './types';
import ancestorMixin from '../_utils/ancestorMixin';
import { prefix } from '../_utils/shared';
import { SyntheticEvent, FormHTMLAttributes } from 'vue-tsx-support/types/dom';
import deepmerge from 'deepmerge';
import { ObjectSchemaDefinition } from 'yup';
import { FormError } from './FormError';

const baseFormName = `${prefix}form`;
export default componentFactoryOf<FormEvents, FormScopedSlots>()
  .mixin(ancestorMixin('form'))
  .create({
    name: baseFormName,
    props: {
      initialValues: props(Object).default(() => ({})),
      validateSchema: props<ObjectSchemaDefinition<Record<string, any>>>(Object).optional,
      validateFirst: props(Boolean).default(false),
    },
    data() {
      return {
        model: deepmerge({}, this.initialValues),
        errors: {},
        children: [],
      } as {
        model: Record<string, any>,
        errors: any,
        children: (InstanceType<VueConstructor> & {
          validate: () => Promise<Record<string, any>>,
        })[],
      };
    },
    methods: {
      reset() {
        this.model = deepmerge({}, this.initialValues);
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
              this.$set(this.errors, name, error);
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
      handleSubmit(e: SyntheticEvent<FormHTMLAttributes, Event>) {
        e.preventDefault();
        return false;
      },
    },
    render() {
      const {
        $scopedSlots,
        model,
        reset,
        validate,
        handleSubmit,
        errors
      } = this;
      return (
        <form onSubmit={handleSubmit}>
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
