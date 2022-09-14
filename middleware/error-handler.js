const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try again later!",
  };
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if(err.name ==="ValidationError"){
    customError.msg = Object.values(err.errors).map(items=>items.message).join(',');
    customError.statusCode =400;
  }
  if(err.name ==="CastError"){
    console.log(err)
    customError.msg = `No item found for ID: ${err.value}`;
    customError.statusCode =400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate ,value entered for ${Object.keys(
      err.keyValue
    )} field , choose different value`;
    customError.statusCode =400;
  }
  console.log(err);
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
