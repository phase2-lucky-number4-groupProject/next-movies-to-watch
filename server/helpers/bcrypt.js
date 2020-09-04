const bcrypt = require('bcryptjs');

function hashPass(password)
{
    console.log('dari bycrypt')
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePass(password, passHasilHash)
{
    return bcrypt.compareSync(password, passHasilHash)
}

module.exports = { hashPass, comparePass };