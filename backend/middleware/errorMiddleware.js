// The unused `next` is required: Express only treats a middleware with four arguments as an error handler.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Express initialises statusCode to 200, so `|| 500` would let errors return 200.
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Bad client input from Mongoose, not a server fault.
  if (statusCode === 500 && (err.name === "ValidationError" || err.name === "CastError")) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = { errorHandler };
