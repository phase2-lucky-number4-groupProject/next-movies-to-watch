function errorHandler(err, req, res, next) {
    let errors = []
    let statusCode = 500

    switch (err.name) {
        case 'SequelizeValidationError':
            statusCode = 400
            for (let i = 0; i < err.errors.length; i++) {
                errors.push(err.errors[i].message);
            }
            break;
        default:
            errors.push(err.msg)
            break;
    }
    res.status(statusCode).json({errors})
}

module.exports = errorHandler