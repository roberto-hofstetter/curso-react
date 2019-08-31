const Dev = require('../models/Dev')

module.exports = {
    async store(req, res){
        const { user } = req.headers;
        const { devId } = req.params;        

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(404).json({error: 'Dev not exists'});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('deu match')
        }

        loggedDev.likes.push(targetDev._id);

        //precisa disso pra salvar dentro do banco
        await loggedDev.save();

        return res.json(loggedDev);
    }
};