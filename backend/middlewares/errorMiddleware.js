
//when undefines url is requested then throw not found error.
const notFound = async (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error);
}

//settting error handler and status code
const errorHandler = async (err, req, res, next) => {
    const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(errorStatusCode);
    res.json({
        message: err.message,
        stack: err.stack
    })
}

export { notFound, errorHandler }