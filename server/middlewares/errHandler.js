function errHandler(err, req, res, next)
{
    console.log(err, 'dari handler')
    let errors = [];
    let statusCode = 500;

    if(err.name === 'SequelizeValidationError')
    {
        err.errors.forEach(element =>
            {
                errors.push(element.message);
            })
        statusCode = 400;
    }
    else if(err.name === 'JsonWebTokenError')
    {
        errors.push('kamu belum terauthorisasi')
        statusCode = 401;
    }
    else if(err.name === 'SequelizeUniqueConstraintError')
    {
        errors.push('Email sudah pernah terdaftar')
        statusCode = 500;
    }
    else
    {
        errors.push(err.msg);
        statusCode = err.status || statusCode
    }

    res.status(statusCode).json({ errors : errors})
}

module.exports = errHandler;