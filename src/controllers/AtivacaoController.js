import Ativacao from "../models/Ativacao.js";
import * as Yup from 'yup';


class AtivacaoController {

    async store(req,res) {

        const schema = Yup.object().shape({
            codigo: Yup.string().required()
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { codigo } = req.query;
        const ativacao = await Ativacao.findOne({
            where: {codigo}
        });

        if(!ativacao) {
            return res.status(400).json({error: "Código de ativação inválido!"});
        };

        const { email } = ativacao;

        const sqlUsuario = 'UPDATE "Usuario" SET "ativado"=? WHERE "email"=?';
        const valuesUsuario = [true, email];

        await client.query(sqlUsuario, valuesUsuario);

        const sqlAtivacao = 'DELETE from "Ativacao" WHERE "email"=?';
        const valuesAtivacao = [email];

        await client.query(sqlAtivacao, valuesAtivacao);
    };
};

export default new AtivacaoController();