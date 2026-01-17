// di Express, middleware error memiliki 4 parameter: err, req, res, next
// kalau hanya ada 3 parameter (req, res, next), itu bukan middleware error tapi middleware biasa (route handler atau middleware umum)
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        code: err.statusCode,
        status: 'ERROR',
        message: err.message || 'Internal Server Error'
    });
};

export default errorMiddleware;