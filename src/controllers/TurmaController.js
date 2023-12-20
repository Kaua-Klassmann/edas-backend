import Turma from "../models/Turma.js";
import * as Yup from 'yup';


class TurmaController {

    async index(req,res) {
        const turmas = await Turma.findAll();
        return res.json(turmas);
    };
};

export default new TurmaController();