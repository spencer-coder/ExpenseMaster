// The unused `next` parameter is required: Express only treats a middleware as
// an error handler when it declares four arguments.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Express initialises statusCode to 200, which is truthy, so `|| 500` would
  // let an error thrown without an explicit res.status() return HTTP 200.
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = { errorHandler };
