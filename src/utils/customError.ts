export class CustomError extends Error {
    public statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);  // Pass the message to the base Error class
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, new.target.prototype);  // Restore prototype chain
    }
  }
  