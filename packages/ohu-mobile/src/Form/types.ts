import { ValidationError, ObjectSchemaDefinition } from 'yup';

export type FormAlign = 'left' | 'right' | 'center';

export type FormTrigger = 'blur' | 'change';
export interface FormValuesChangeEvent {
  prop: string;
  value: string;
  allValues: string;
}

export interface FormEvents {
  onValuesChange: FormValuesChangeEvent;
  onSubmit: Record<string, any>,
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
  default: {
    errors: Record<string, ValidationError>;
    model: Record<string, any>;
    reset: () => void;
    validate: () => Promise<Record<string, any> | void>;
  };
}
