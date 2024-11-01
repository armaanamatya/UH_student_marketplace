const asyncHandler = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res);
      } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
      }
    };
  };
  
export default asyncHandler;
  