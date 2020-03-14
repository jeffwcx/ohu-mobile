import { Mixin } from '../types';
import { FormFieldInnerMethods } from './types';

export const fieldMixin = {
  inject: {
    field: {
      from: 'form-field',
      default: null,
    }
  },
  computed: {
    fieldName() {
      let instance = this as Mixin<{ field: FormFieldInnerMethods }>;
      let field = instance.field;
      return field?.name;
    },
  },
  methods: {
    getFieldValue(initValue?: any) {
      let instance = this as Mixin<{ field: FormFieldInnerMethods }>;
      let field = instance.field;
      if (field) return field.fieldValue;
      return initValue;
    },
  },
  created() {
    let instance = this as Mixin<{ field: FormFieldInnerMethods }>;
    let field = instance.field;
    if (field) {
      field.addChildren(instance);
      instance.$once('hook:beforeDestroy', () => {
        field.removeChildren(instance);
      });
    }
  },
};
