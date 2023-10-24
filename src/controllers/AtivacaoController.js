import databaseConfig from "../config/database.js";
import Ativacao from "../models/Ativacao.js";
import * as Yup from 'yup';
import Usuario from "../models/Usuario.js";

const Pool = require('postgres').Pool
const pool = new Pool(databaseConfig)

class AtivacaoController {

    async store(req,res) {

        const schema = Yup.object().shape({
            codigo: Yup.string().required()
        });

        if(! (await schema.isValid(req.params))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { codigo } = req.params;
        const ativacao = await Ativacao.findOne({
            where: {codigo}
        });

        if(!ativacao) {
            return res.status(400).json({error: "Código de ativação inválido!"});
        };

        const { email } = ativacao;

        const usuario = await Usuario.findOne({
            where: {email}
        });

        pool.query('UPDATE "Usuario" SET "ativado"=$1 WHERE "email"=$2',
            [true, email], (error, results) => {});
        pool.query('DELETE FROM "Ativacao" WHERE "email"=$1', [email], (error, results) => {});
    };
};

export default new AtivacaoController();