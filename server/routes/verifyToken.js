const jwt = require('jsonwebtoken')

const verifyToken=async(req, res, next) =>{
    const token = req.header('auth-token')
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next()
    } catch (err) {
      logger.error(req.originalUrl+err)
        res.status(401).send('Invalid Token');
    }
}

module.exports = {
    verifyToken,
}