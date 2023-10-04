import Turma from "../models/Turma.js";
import * as Yup from 'yup';


class TurmaController {

    async show(req,res) {

        const schema = Yup.object().shape({
            id: Yup.number().min(1)
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { id } = req.query;
        const turma = await Turma.findByPk(id);

        if(!turma) {
            return res.status(400).json({error: "Turma não encontrada"});
        };

        const { nome } = turma;
        return res.json({
            id, 
            nome,
        });
    };

    async index(req,res) {
        const turmas = await Turma.findAll();
        return res.json(turmas);
    };
};

export default new TurmaController();