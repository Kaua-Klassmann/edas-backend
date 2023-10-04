import Sequelize from "sequelize";
import Curso from "../models/Curso.js";
import Turma from "../models/Turma.js";
import Usuario from "../models/Usuario.js";
import Disciplina from "../models/Disciplina.js";
import Prova from "../models/Prova.js";
import databaseConfig from "../config/database.js";

const models = [
  Curso,
  Turma,
  Usuario,
  Disciplina,
  Prova,
];

class Database {
  constructor() {
    this.init();
  };

  init() {
    // Faz a conexão com o BD
    this.connection = new Sequelize(databaseConfig);

    // Carrega os models e associaçoes com map
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  };
};

export default new Database();