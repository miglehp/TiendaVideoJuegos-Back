const bcrypt = require('bcryptjs');
const {createToken} = require('../../helpers/utils');

const User = require("../model/user.model");

const create = async (req, res)=>{

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    try {
        const [result] = await User.insert(req.body);
        //Quiero que la respuesta de esta petición sea el NUEVO USUARIO CREADO
        const [users] = await User.getById(result.insertId);
        res.json(users[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

const profile = async (req, res) => {
    res.json(req.user);
}

const update = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);

    const [result] = await User.updateById(userId, req.body);

    //Como respuesta devuelvo el usuario modificado
    const [users] = await User.getById(userId);

    res.json(users[0]);
}

const checkLogin = async (req, res) => {

    const [arrUser] = await User.getByEmail(req.body.email);
    if(arrUser.length === 0){
        return res.json({fatal: 'Error en email y/o contraseña'});
    }

    const user = arrUser[0];
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    if(!iguales){
        return res.json({fatal: 'Error en email y/o contraseña'});
    }

    res.json({
        success: 'Login correcto',
        token: createToken(user)
    });

}

module.exports = {
    create, update, checkLogin, profile
}