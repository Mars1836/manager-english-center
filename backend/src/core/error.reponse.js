class ErrorReponse extends Error {
  constructor(message, status) {
    super(message); // Call the parent class constructor
    this.status = status;
  }
}

class BadRequestError extends ErrorReponse {
  constructor(
    message = "The server cannot process the request due to a client error."
  ) {
    super(message, 400);
  }
}

class ForbiddenError extends ErrorReponse {
  constructor(
    message = "The server understood the request but refuses to authorize it."
  ) {
    super(message, 403);
  }
}

class UnauthorizedError extends ErrorReponse {
  constructor(
    message = "The request has not been applied because it lacks valid authentication credentials."
  ) {
    super(message, 401);
  }
}

class NotFoundError extends ErrorReponse {
  constructor(message = "The requested resource could not be found.") {
    super(message, 404);
  }
}

class InternalServerError extends ErrorReponse {
  constructor(message = "The server encountered an unexpected condition.") {
    super(message, 500);
  }
}
module.exports = {
  ErrorReponse,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
};
