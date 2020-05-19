import { FormEvents, FormScopedSlots, FormProps, FormAlign, FormTrigger, FormFieldInstance, FormValidateSchemaProp } from './types';
import { SyntheticEvent, FormHTMLAttributes } from 'vue-tsx-support/types/dom';
import deepmerge from 'deepmerge';
import * as Yup from 'yup';
import { FormError } from './FormError';
import { defineAncestorComponent, props } from '../_utils/defineComponent';
import { VNodeData } from 'vue/types/umd';

export default defineAncestorComponent<FormProps, FormEvents, FormScopedSlots>('form').create({
  props: {
    initialValues: props(Object).default(() => ({})),
    validateFunc: props<(values: any, props: FormProps) => Record<string, any>>(Function).optional,
    validateSchema: props.ofType<FormValidateSchemaProp>().optional,
    validateFirst: props(Boolean).default(false),
    inline: props(Boolean).default(true),
    labelAlign: props.ofType<FormAlign>().optional,
    labelWidth: props(String).optional,
    contentAlign: props.ofType<FormAlign>().optional,
    trigger: props.ofType<FormTrigger>().default('change'),
    scrollToError: props(Boolean).default(false),
    excludeFields: props<string[]>(Array).default(() => []),
  },
  data() {
    return {
      model: deepmerge({}, this.initialValues) as Record<string, any>,
      errors: {} as Record<string, any>,
      errorNames: [] as string[],
      children: [] as FormFieldInstance[],
    };
  },
  methods: {
    addError(name: string, error: Error) {
      this.$set(this.errors, name, error);
      this.errorNames.push(name);
    },
    removeError(name: string) {
      if (this.errors[name]) {
        this.$delete(this.errors, name);
        this.errorNames = this.errorNames.filter(errorName => errorName !== name);
      }
    },
    addFormField(field: FormFieldInstance) {
      if (this.children.indexOf(field) < 0) {
        this.children.push(field);
      }
    },
    removeFormField(field: FormFieldInstance) {
      this.children = this.children.filter((item) => field !== item);
    },
    // 👇 open api
    reset() {
      this.errors = {};
      this.errorNames = [];
      this.children.forEach((item) => {
        if (item.name) {
          item.resetField(this.initialValues[item.name]);
        }
      });
    },
    validateField(name: string) {
      const child = this.children.find((item) => item.$props.name === name);
      if (child) {
        return child.formValidate();
      } else {
        return Promise.resolve(this.model[name]);
      }
    },
    validate() {
      this.errors = {};
      this.errorNames = [];
      if (this.validateFunc) {
        const errors = this.validateFunc(this.model, this.$props);
        const errorNames = Object.keys(errors);
        if (errorNames.length === 0) return Promise.resolve(this.model);
        this.errors = errors;
        this.errorNames = errorNames;
        return Promise.reject(new FormError(errors));
      }
      const validatingChildren = this.children
        .filter((child) => child.$props.name !== undefined);
      const tasks = validatingChildren.map((component) => {
        const name = component.$props.name;
        return [name, () => component.formValidate()];
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
            // filter undefined ''
            if (value !== undefined) {
              if (this.excludeFields.indexOf(n) < 0) {
                r[n] = value;
              }
            }
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
      if (typeof this.validateSchema === 'function') {
        return this.validateSchema(Yup)[name];
      }
      if (this.validateSchema) return this.validateSchema[name];
    },
    getFieldValue(name: string) {
      return this.model[name];
    },
    getChild(name: string) {
      const field = this.children.find((item) => item.name === name);
      return field;
    },
    setFieldValue(name: string, value: any) {
      this.$set(this.model, name, value);
      const field = this.getChild(name);
      if (field) {
        field.resetField(value);
      }
      this.$emit('valuesChange', { prop: name, value, allValues: this.model });
    },
    scrollToField(name: string) {
      const field = this.getChild(name);
      if (field) {
        field.$el.scrollIntoView();
      }
    },
    submit() {
      return this.validate().then((values: any) => {
        this.$emit('submit', values);
      }).catch(({ errors }) => {
        if (this.scrollToError) {
          const errorName = this.errorNames[0];
          this.$nextTick(() => {
            this.scrollToField(errorName);
          })
        }
        this.$emit('failed', errors);
      });
    },
    // 👆 open api
    handleSubmit(e: SyntheticEvent<FormHTMLAttributes, Event>) {
      e.preventDefault();
      this.submit();
    },
  },
  render() {
    const root = this.root();
    const {
      $scopedSlots,
      $attrs,
      model,
      reset,
      validate,
      handleSubmit,
      errors,
      setFieldValue,
      getFieldValue,
      validateField,
      scrollToField,
      submit,
    } = this;
    const formProps: VNodeData = {
      class: root,
      attrs: $attrs,
      on: {
        submit: handleSubmit,
      },
    };
    return (
      <form {...formProps}>
        {
          $scopedSlots.default &&
          $scopedSlots.default({
            errors,
            model,
            reset,
            validate,
            setFieldValue,
            getFieldValue,
            validateField,
            submit,
            scrollToField,
          })
        }
      </form>
    );
  },
});
