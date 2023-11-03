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
            return res.status(400).send(`<html>
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                rel="stylesheet" crossorigin="anonymous">
            </head>
            <body style="heigth: 100vh; background: linear-gradient(45deg, #21d4fd 0%, #b721ff 100%); display: grid; place-items: center;">
                <main class="rounded-3 p-3 bg-light" style="text-align: center; max-width: 60vw; font-size: 30px;">
                    <p>Código de ativação não encontrado!</p>
                </main>
            </body>
            </html>`);
        };

        const { email } = ativacao;

        const usuario = await Usuario.findOne({
            where: {email}
        });

        await usuario.update({ativado: true});

        return res.send(`<html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet" crossorigin="anonymous">
        </head>
        <body style="heigth: 100vh; background: linear-gradient(45deg, #21d4fd 0%, #b721ff 100%); display: grid; place-items: center;">
            <main class="rounded-3 p-3 bg-light" style="text-align: center; max-width: 60vw; font-size: 30px;">
                <p>Conta com o email '${email}' ativada com sucesso!'</p>
            </main>
        </body>
        </html>`);
    };
};

export default new AtivacaoController();