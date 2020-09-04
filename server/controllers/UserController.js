const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController
{
    static register(req, res, next)
    {
        console.log('oookkkkkkkkkk')
        let { email, password } = req.body;
        User.create(
        {
            email,
            password
        })
            .then(data =>
            {
                res.status(201).json(
                { 
                     msg : 'register success',
                     id : data.id,
                     email : data.email
                })
            })
            .catch(err =>
            {
                // console.log(err.name, '<<<<<<<<<<<<<<<<ini dari console log controller')
                next(err);
            })
    }

    static login(req, res, next)
    {
        console.log('ini login server')
        let { email, password } = req.body;
        User.findOne(
        {
            where : {email}
        })
            .then(data =>
                {
                    if(!data) throw {msg : "invalid email or password", status: 400}
                    let comparePassword = comparePass(password, data.password)
                    if(!comparePassword) throw {msg : 'invalid email or password', status: 400}
                    let payload =
                    {
                        id : data.id,
                        email : data.email
                    }
                    let token = generateToken(payload);
                    res.status(200).json({ token })
                })
            .catch(err =>
                {
                    next(err);
                })
    }

    static googleSign(req, res, next)
    {
        let { id_token } = req.body
        let email = null;
        const client = new OAuth2Client(`process.env.CLIENT_ID`);
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID,
        })
            .then(ticket =>
                {
                    const payload = ticket.getPayload();
                    email = payload.email;
                    console.log(payload, '<<<<<<<<<tikect')
                    return User.findOne(
                    {
                        where: { email: payload.email }
                    })
                })
            .then(data =>
                {
                    if(data) return data
                    else
                    {
                        return User.create(
                        {
                            email,
                            password: 'movie-app'
                        })
                    }
                })
            .then(data =>
                {
                    const token = generateToken(
                    {
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({ token })
                })
            .catch(err =>
                {
                    console.log(err, '<<<<<<<<<<<<ERRORRRR')
                })
    }
}

module.exports = UserController;