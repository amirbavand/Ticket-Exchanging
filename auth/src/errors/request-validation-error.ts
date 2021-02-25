import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    //this is only because of using Error class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
