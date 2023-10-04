import Curso from "../models/Curso.js";
import * as Yup from 'yup';


class CursoController {

    async show(req,res) {

        const id = req.uid;
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