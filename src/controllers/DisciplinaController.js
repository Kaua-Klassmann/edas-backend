import Disciplina from "../models/Disciplina.js";
import * as Yup from 'yup';

class DisciplinaController{

    async index(req,res) {
        const disciplinas = await Disciplina.findAll();
        return res.json(disciplinas);
    };

    async disciplinasUsuario(req,res) {
        const disciplinas = await Disciplina.findAll({
            where: {curso: req.ucurso,
                ano: req.uano}
        });

        return res.json(disciplinas);
    };
};

export default new DisciplinaController();