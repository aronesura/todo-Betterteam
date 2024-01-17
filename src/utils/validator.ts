import Ajv, { ValidateFunction, ErrorObject } from 'ajv';

interface ValidatorFactory<T> {
  schema: object;
  verify: (data: T) => T;
}

export interface IValidationError {
  param: string;
  message: string;
  value: string | number | null;
}

class ValidationError extends Error {
  validationErrors: IValidationError[];

  constructor(validationErrors: IValidationError[]) {
    super();
    this.name = 'SchemaValidationError';
    this.validationErrors = validationErrors;
  }
}

const ajv = new Ajv({ allErrors: true });

export default function validatorFactory<T>(schema: object): ValidatorFactory<T> {
  const validate: ValidateFunction<T> = ajv.compile(schema) as ValidateFunction<T>;

  const verify = (data: T): T => {
    const isValid = validate(data);
    if (isValid) {
      return data;
    }

    const filteredErrors = validate.errors?.filter((err: ErrorObject) => err.keyword !== 'if');
    const validationErrors: any[] = [];
    filteredErrors?.forEach((error) => {
      validationErrors.push({
        param: error.params['missingProperty']
          ? error.params['missingProperty']
          : error.instancePath.slice(1),
        message: error.message,
        value: error.params['missingProperty'] ? null : error.data,
      });
    });

    throw new ValidationError(validationErrors);
  };

  return { schema, verify };
}
