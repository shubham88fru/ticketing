export class DatabaseConnectionError extends Error {
  reason = 'Error Connecting to database';
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
