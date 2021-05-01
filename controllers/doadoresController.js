const { Doador } = require("../models");
const bcrypt = require('bcryptjs');

const doadoresController = {
    index: async (req, res) => {
        const doadores = await Doador.findAll({
            order: [['updatedAt', 'DESC']]
        });

        return res.json(doadores);
    },

    create: async (req, res) => {
        const { nome, email, senha } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha, 10);

        const novoDoador = await Doador.create({
            nome,
            email,
            senha: senhaCrypt
        });

        return res.json(novoDoador);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const atualizaDoador = req.body;

        await Doador.update(atualizaDoador, {
            where: { id }
        });

        return res.json(atualizaDoador);
    },

    updatePassword: async (req, res) => {
        const { id } = req.params;
        const { senha, novaSenha } = req.body;

        const doador = await Doador.findByPk(id);
        const validaSenha = (doador && bcrypt.compareSync(senha, doador.senha));

        if (validaSenha) {
            const novaSenhaCrypt = bcrypt.hashSync(novaSenha, 10);
            await Doador.update({ senha: novaSenhaCrypt }, { where: { id } });
        }

        return res.send(validaSenha);
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const deleteDoador = await Doador.destroy({
            where: { id }
        });

        return res.json(deleteDoador);
    },

}

module.exports = doadoresController;