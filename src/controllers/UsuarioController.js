import Usuario from "../models/Usuario.js";
import Ativacao from "../models/Ativacao.js";
import * as Yup from 'yup';
import bcrypt from "bcryptjs";
import { transporter } from "../config/mail.js";


class UsuarioController {

    async store(req,res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string().email().required(),
            senha: Yup.string().required().min(6),
            ano: Yup.number().required().min(1).max(4),
            curso: Yup.number().min(1).required(),
            turma: Yup.number().min(1).required(),
        });

        if(! (await schema.isValid(req.body))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { email, nome } = req.body;

        if(email.split("@")[1] != "aluno.feliz.ifrs.edu.br"){
            return res.status(422).json({error: "Email inválido."});
        };

        const usuario = await Usuario.findOne({
            where: {email: req.body.email}
        });

        if(usuario) {
            return res.status(400).json({error: "O email já está cadastrado."});
        };

        const body = {
            curso: req.body.curso,
            ano: req.body.curso,
            turma: req.body.turma,
            email: req.body.email,
            nome: req.body.nome,
            senha: req.body.senha
        }

        const { id } = await Usuario.create(body);

        //enviar email

        try {
            const codigo = (await bcrypt.hash(email, 8)).replace(/[^a-zA-Z0-9]/g, "");

            const html = `<html>
                <h4>Clique <a href="https://edas-backend.onrender.com/codigo/${codigo}">aqui</a> para ativar sua conta!</h4>
            </html>`;
            
            const options = {
              from: process.env.DB_MAIL_USER,
              to: email,
              subject: `EDAS [${email}]`,
              text: `Clique aqui para ativar sua conta:
              https://edas-backend.onrender.com/codigo/${codigo}`,
              html,
            };
            
            const info = await transporter.sendMail(options);
            if (!info.messageId) {
              return res.status(400).json({
                error: "Ocorreu um erro no envio do email de confirmação.",
              });
            }

            await Ativacao.create({
                "email": email,
                "codigo": codigo
            });
          } catch (error) {
            return res.status(400).json({ error: "Algum erro."});
        }

        //responder para o frontend o que foi feito  

        return res.json({
            id, 
            nome, 
            email,
        });
    };

    async show(req,res) {

        const schema = Yup.object().shape({
            id: Yup.number().min(1) 
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { id } = req.query;
        const usuario = await Usuario.findByPk(id);

        if(!usuario) {
            return res.status(400).json({error: "Usuario não encontrada"});
        };

        const { nome, curso, ano, turma } = usuario;
        return res.json({
            nome,
            curso,
            ano,
            turma
        });
    };

    
};

export default new UsuarioController();