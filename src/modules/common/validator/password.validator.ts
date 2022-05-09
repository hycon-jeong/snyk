import { registerDecorator, ValidationOptions } from 'class-validator';

export function Password<E>(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'password',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: any) {
          /**
           * Minimum eight characters
           * at least one uppercase letter and one lowercase letter
           * one number and one special character
           */
          const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          const isPass = regex.test(value);
          return isPass;
        },
        defaultMessage() {
          return '$property must match password rule';
        },
      },
    });
  };
}
