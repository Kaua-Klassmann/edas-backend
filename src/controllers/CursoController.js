import Curso from "../models/Curso.js";
import * as Yup from 'yup';


class CursoController {

    async show(req,res) {

        const schema = Yup.object().shape({
            id: Yup.number().min(1)
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { id } = req.query;
        const curso = await Curso.findByPk(id);

        if(!curso) {
            return res.status(400).json({error: "Curso não encontrado"});
        };

        const { nome } = curso;
        return res.json({
            id, 
            nome,
        });
    };

    async index(req,res) {
        const cursos = await Curso.findAll();
        return res.json(cursos);
    };

};

export default new CursoController();