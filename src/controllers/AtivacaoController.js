import databaseConfig from "../config/database.js";
import Ativacao from "../models/Ativacao.js";
import * as Yup from 'yup';


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

        const sqlUsuario = 'UPDATE "Usuario" SET "ativado"=$1 WHERE "email"=$2';
        const valuesUsuario = [true, email];

        const client = databaseConfig;

        await client.connect();

        await client.query(sqlUsuario, valuesUsuario);

        const sqlAtivacao = 'DELETE from "Ativacao" WHERE "email"=$1';
        const valuesAtivacao = [email];

        await client.query(sqlAtivacao, valuesAtivacao);

        res.json({
            resp: "Funcionou"
        })

        con.con
    };
};

export default new AtivacaoController();