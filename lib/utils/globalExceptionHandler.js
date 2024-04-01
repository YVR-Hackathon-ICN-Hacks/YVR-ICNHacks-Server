function globalExceptionHandler(err, req, res) {

  let errorMessage = err.message;
  let statusCode = err.statusCode || 500;

  switch(statusCode) {
    case 500:
      errorMessage = 'Internal Server Error'
      break;
    case 400:
      errorMessage = 'Invalid Request'
      break;
    case 404:
      errorMessage = 'Cannot Find Resource'
      break;
    case 405:
      errorMessage = `Method ${req.method} is not allowed.`
      break;
  }

  res.status(statusCode).json({
    error: errorMessage
  })

}

export default globalExceptionHandler;