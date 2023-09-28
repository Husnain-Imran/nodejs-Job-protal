const errorMiddleware = (error, req, res, next) => {
    console.error(error);
  
    const defaultErrors = {
      statusCode: 500,
      message: error.message || "Internal Server Error",
    };
  
    if (error.name === "ValidationError") {
      defaultErrors.statusCode = 400;
      defaultErrors.message = Object.values(error.errors)
        .map((item) => item.message)
        .join(",");
    }
  
    if (error.code && error.code === 11000) {
      defaultErrors.statusCode = 400;
      defaultErrors.message = `${Object.keys(error.keyValue)} field has to be unique`;
    }
  
    // Send the response and exit the function
    res.status(defaultErrors.statusCode).json({ message: defaultErrors.message });
  };
  
  export default errorMiddleware;
  