import { ValidationError } from 'yup';

export class FormError extends Error {
  constructor(public errors: Record<string, ValidationError>) {
    super();
  }
}
