import { ValidationError } from 'yup';
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
  initialValues: Record<string, any>;
}

export interface FormScopedSlots {
  default: {
    errors: Record<string, ValidationError>;
    model: Record<string, any>;
    reset: () => void;
    validate: () => Promise<Record<string, any> | void>;
  };
}
