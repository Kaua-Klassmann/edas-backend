import Ativacao from "../models/Ativacao.js";
import * as Yup from 'yup';
import Usuario from "../models/Usuario.js";

class AtivacaoController {

    async update(req,res) {

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

        await usuario.update({ativado: true});

        return res.send();
    };
};

export default new AtivacaoController();