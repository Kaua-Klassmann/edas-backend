import { Router } from "express";

import CursoController from "../controllers/CursoController.js";
import TurmaController from "../controllers/TurmaController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import DisciplinaController from "../controllers/DisciplinaController.js";
import ProvaController from "../controllers/ProvaController.js";
import SessionController from "../controllers/SessionController.js";
import AtivacaoController from "../controllers/AtivacaoController.js";
import authMiddleware from "../middlewares/auth.js";

const routes = new Router();

routes.get('/cursos', CursoController.index);
routes.get('/turmas', TurmaController.index);
routes.post('/usuario', UsuarioController.store);
routes.get('/codigo/:codigo', AtivacaoController.update);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/disciplinasUsuario', DisciplinaController.disciplinasUsuario);
routes.get('/provasUsuario', ProvaController.provasUsuario);
routes.delete('/prova', ProvaController.delete);
routes.post('/prova', ProvaController.store);
routes.get('/usuario', UsuarioController.show);

export default routes;