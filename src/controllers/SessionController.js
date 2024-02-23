import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import Usuario from '../models/Usuario.js';
import authConfig from '../config/auth.js';

class SessionController {
    async store(req,res) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            senha: Yup.string().required(),
        });

        if(! (await schema.isValid(req.body))) {
            return res.status(400).json({error: "Schema inválido."});
        }

        const { email, senha } = req.body;

        if(email.split("@")[1] != "aluno.feliz.ifrs.edu.br"){
            return res.status(422).json({error: "Email inválido."});
        };

        // Email existe?
        const usuario = await Usuario.findOne({ where: { email } });
        if(!usuario) {
            return res.status(400).json({error: "Usuário não encontrado."});
        }

        // Conta ativada?
        if(!usuario.ativado){
            return res.status(401).json({error: "Conta não ativada."});
        }

        // Senha incorreta?
        if(! (await usuario.checkPassword(senha))) {
            return res.status(402).json({error: "Senha errada."});
        }

        const { id, nome, curso, turma, ano, ativado } = usuario;

        return res.json({
            user: {
                id, 
                nome, 
                email,
                curso,
                turma,
                ano,
            },
            token: jwt.sign({ id, curso, ano }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }), 
        });
    }

}


export default new SessionController();
