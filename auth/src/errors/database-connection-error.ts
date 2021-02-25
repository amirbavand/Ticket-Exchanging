export class DatabaseConnectionError extends Error {
  reason = "problem with database connection";
  constructor() {
    super();

    //this is only because of using Error class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
