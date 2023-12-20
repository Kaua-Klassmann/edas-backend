import Curso from "../models/Curso.js";
import * as Yup from 'yup';


class CursoController {

    async index(req,res) {
        const cursos = await Curso.findAll();
        return res.json(cursos);
    };

};

export default new CursoController();