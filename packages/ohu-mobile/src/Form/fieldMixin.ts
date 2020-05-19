import Vue from 'vue';
import { Mixin } from '../types';
import { FormFieldInnerMethods } from './types';

export interface FieldMixinOptions  {
  field?: FormFieldInnerMethods;
  initFieldValue(initValue?: any): any;
  setFieldValue(value: any): void;
  [key: string]: any;
};

type FieldMixinInstance = Mixin<FieldMixinOptions>;

export const fieldMixin = (
  internalValueName: string,
  initValueName: any,
  initInternalValueSelf = false,
) => {
  return {
    inject: {
      field: {
        from: 'form-field',
        default: null,
      }
    },
    data() {
      let instance = this as FieldMixinInstance;
      const selfValue = instance[initValueName];
      let initValue = instance.initFieldValue(selfValue);
      if (initInternalValueSelf) {
        return {};
      }
      return {
        [internalValueName]: initValue,
      };
    },
    methods: {
      setFieldValue(value: any) {
        let instance = this as FieldMixinInstance;
        instance[internalValueName] = value;
      },
      initFieldValue(initValue?: any) {
        let instance = this as Mixin<{ field: FormFieldInnerMethods }>;
        let field = instance.field;
        if (!field) return initValue;
        const success = field.addChildren(instance);
        if (!success) return initValue;
        instance.$once('hook:beforeDestroy', () => {
          field.removeChildren(instance);
        });
        return field.fieldValue;
      }
    },
  };
};
