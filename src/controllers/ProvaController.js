import { Op } from "sequelize";
import Prova from "../models/Prova.js";
import * as Yup from 'yup';


class ProvaController {

    async show(req,res) {

        const schema = Yup.object().shape({
            id: Yup.number().min(1) 
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { id } = req.query;
        const prova = await Prova.findByPk(id);

        if(!prova) {
            return res.status(400).json({error: "Prova não encontrada"});
        };

        const { curso, ano, turma, disciplina, dia, horario, usuario } = prova;
        return res.json({
            id, 
            curso,
            ano,
            turma,
            disciplina,
            dia,
            horario,
            usuario
        });
    };

    async index(req,res) {
        /*
        let dia = (new Date()).toISOString().split('T')[0];
        const provas = await Prova.findAll(
            {
                where: {
                    dia: {
                        [Op.gte]: dia
                    }
                }
            }
        );
        */
       const provas = await Prova.findAll();
        return res.json(provas);
    };

    async delete(req,res){

        const schema = Yup.object().shape({
            id: Yup.number().min(1)
        });

        if(! (await schema.isValid(req.params))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const prova = await Prova.findOne({
            where: {id: req.query.id}
        });

        if(!prova) {
            return res.status(400).json({error: "A prova não foi encontrada."});
        }

        await prova.remove();

        return res.send("Concluido")
    }

    async store(req,res) {

        console.log(">>>>", req.body);

        const schema = Yup.object().shape({
            turma: Yup.number().min(1).required(),
            disciplina: Yup.number().min(1).required(),
            dia: Yup.string().required(),
            horario: Yup.string().required()
        });

        if(! (await schema.isValid(req.body))) {
            return res.status(422).json({error: "Formato inválido."});
        };

        const provaStore = await Prova.findOne({
            where: {
                disciplina: req.body.disciplina,
                horario: req.body.horario,
                dia: req.body.dia
            }
        });

        if(provaStore) {
            return res.status(400).json({error: "A prova já está cadastrada."});
        }

        const body = {
            curso: req.ucurso,
            ano: req.uano,
            turma: req.body.turma,
            disciplina: req.body.disciplina,
            dia: req.body.dia,
            horario: req.body.horario,
            usuario: req.uid
        }

        const { id, curso, ano, turma, disciplina, dia, horario, usuario } = await Prova.create(body);
        return res.json({
            id,
            curso,
            ano,
            turma,
            disciplina,
            dia, 
            horario,
            usuario
        });
    };

    async provasUsuario(req,res) {

        const provas = await Prova.findAll({
            where: {
                curso: req.ucurso,
                ano: req.uano
            }
        });

        if(!provas) {
            return res.status(400).json({error: "Prova não encontrada"});
        };

        return res.json(provas);
    };
};

export default new ProvaController();
