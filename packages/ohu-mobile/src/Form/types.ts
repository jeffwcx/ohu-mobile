import Vue from 'vue';
import * as Yup from 'yup';
import { CombinedVueInstance } from 'vue/types/vue';
import { FieldMixinOptions } from './fieldMixin';

export type FormAlign = 'left' | 'right' | 'center';

export type FormTrigger = 'blur' | 'change';

export type FormFieldInput = InstanceType<typeof Vue> & FieldMixinOptions;

export interface FormFieldInnerMethods {
  name: string;
  children?: FormFieldInput | null;
  fieldValue: any;
  addChildren(input: InstanceType<typeof Vue>): boolean;
  removeChildren(input?: InstanceType<typeof Vue>): void;
  fieldValidate(): Promise<any>;
  formValidate(): Promise<any>;
  resetField(value: any): void;
  blur: () => void;
}

export type FormFieldInstance = CombinedVueInstance<Vue, {}, FormFieldInnerMethods, {}, {}>;
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


export type FormValidateSchemaProp = ((yup: typeof Yup) => Yup.ObjectSchemaDefinition<Record<string, any>>) | Yup.ObjectSchemaDefinition<Record<string, any>>;

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
