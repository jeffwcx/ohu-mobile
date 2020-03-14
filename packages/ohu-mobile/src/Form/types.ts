import Vue from 'vue';
import { ValidationError, ObjectSchemaDefinition } from 'yup';
import { CombinedVueInstance } from 'vue/types/vue';

export type FormAlign = 'left' | 'right' | 'center';

export type FormTrigger = 'blur' | 'change';


export interface FormFieldMixinMethods {
  resetFieldValue?: (value?: any) => void;
  getFieldValue?: (initValues?: any) => any;
}

export type FormFieldInput = InstanceType<typeof Vue> & FormFieldMixinMethods;

export interface FormFieldInnerMethods {
  name: string;
  fieldValue: any;
  addChildren(input: InstanceType<typeof Vue>): void;
  removeChildren(input?: InstanceType<typeof Vue>): void;
  validate(): Promise<any>;
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
  onSubmit: Record<string, any>;
  onFail: Record<string, ValidationError>;
}

export interface FormProps {
  initialValues?: Record<string, any>;
  validateSchema?: ObjectSchemaDefinition<Record<string, any>>;
  inline?: boolean;
  validateFirst?: boolean;
  labelAlign?: FormAlign;
  labelWidth?: string;
  contentAlign?: FormAlign;
  trigger?: FormTrigger;
  scrollToError?: boolean;
}

export interface FormFieldProps {
  initialValue?: any;
  label?: string;
  name?: string;
  labelAlign?: FormAlign;
  labelWidth?: string;
  contentAlign?: FormAlign;
  trigger?: FormTrigger;
}

export interface FormScopedSlots {
  default?: {
    errors: Record<string, ValidationError>;
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
