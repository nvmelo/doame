const { Doador } = require("../models");
const bcrypt = require('bcryptjs');

const doadoresController = {
    index: async (req, res) => {
        const doadores = await Doador.findAll();
        return res.json(doadores);
    },


    create: async (req, res) => {
        const { nome, email, senha } = req.body;
        const senhaCrypt = bcrypt.hashSync(senha, 10);

        const novoDoador = await Doador.create({
            nome,
            email,
            senha : senhaCrypt
        });

        return res.json(novoDoador);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const atualizarDoador = req.body;

        await Doador.update(atualizarDoador, {
            where: {
                id: id
            }
        });

        return res.json(atualizarDoador);
    },

    delete: async (req, res) => {
        const { id } = req.params;

        const deleteDoador = await Doador.destroy({
            where: {
                id: id
            }
        });
        return res.json(deleteDoador);
    },

}

module.exports = doadoresController;