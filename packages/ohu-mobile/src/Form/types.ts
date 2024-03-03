import Vue from 'vue';
import * as Yup from 'yup';
import { CombinedVueInstance } from 'vue/types/vue';
import { FieldMixinOptions } from './fieldMixin';
import { FormError } from './FormError';

export type FormAlign = 'left' | 'right' | 'center';

export type FormTrigger = 'blur' | 'change';

export type FormFieldInput = InstanceType<typeof Vue> & FieldMixinOptions;
export type FormFieldInstance = CombinedVueInstance<
  Vue,
  {},
  FormFieldInnerMethods,
  {},
  {}
>;

export interface FormFieldInnerMethods {
  name: string;
  children?: FormFieldInput | null;
  fieldValue: any;
  triggerEvent: FormTrigger;
  error: FormError;
  schema?: Yup.Schema<any>;
  addChildren(input: FormFieldInstance): boolean;
  removeChildren(input?: FormFieldInstance): void;
  fieldValidate(): Promise<any>;
  formValidate(): Promise<any>;
  resetField(value: any): void;
  blur: () => void;
  onBlur: () => void;
}

export interface FormValuesChangeEvent {
  prop: string;
  value: string;
  allValues: string;
}

export interface FormEvents {
  onValuesChange: FormValuesChangeEvent;
  onSubmit: any;
  onFail: Record<string, Yup.ValidationError>;
}

export type FormValidateSchemaProp =
  | ((yup: typeof Yup) => Record<string, Yup.AnySchema>)
  | Record<string, Yup.AnySchema>;

export interface FormProps {
  initialValues?: Record<string, any>;
  validateFunc?: (values: any, props: FormProps) => Record<string, any>;
  validateSchema?: FormValidateSchemaProp;
  inline?: boolean;
  validateFirst?: boolean;
  labelAlign?: FormAlign;
  labelWidth?: string;
  contentAlign?: FormAlign;
  trigger?: FormTrigger;
  scrollToError?: boolean;
  excludeFields?: string[];
  padding?: boolean;
  [key: string]: any;
}

export interface FormFieldProps {
  initialValue?: any;
  label?: string;
  name?: string;
  labelAlign?: FormAlign;
  labelWidth?: string;
  contentAlign?: FormAlign;
  trigger?: FormTrigger;
  required?: boolean;
  validate?: (value: any) => string;
}

export interface FormScopedSlots {
  default?: {
    errors: Record<string, Yup.ValidationError>;
    model: Record<string, any>;
    reset: () => void;
    validate: () => Promise<Record<string, any> | void>;
    validateField: (name: string) => any;
    setFieldValue: (name: string, value: any) => void;
    getFieldValue: (name: string) => any;
    submit: () => void;
    scrollToField: (name: string) => void;
  };
}
