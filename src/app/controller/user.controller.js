const User = require("../model/user.model");

const create = async (req, res)=>{
    try {
        const [result] = await User.insert(req.body);
        //Quiero que la respuesta de esta petición sea el NUEVO USUARIO CREADO
        const [users] = await User.getById(result.insertId);
        res.json(users[0]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

const update = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);

    const [result] = await User.updateById(userId, req.body);

    //Como respuesta devuelvo el usuario modificado
    const [users] = await User.getById(userId);

    res.json(users[0]);
}

module.exports = {
    create, update
}