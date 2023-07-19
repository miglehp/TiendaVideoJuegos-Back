const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const obj = {
        userId: user.id,
        userRole: user.es_admin,
        exp: dayjs().add(30, 'days').unix
    }

    return jwt.sign(obj, 'algo facil');

}

module.exports = {
    createToken
}