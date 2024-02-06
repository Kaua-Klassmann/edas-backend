import { DataTypes, Model } from "sequelize";

class Prova extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },

                ano: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                dia: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },

                horario: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                
                descrição: {
                    type: DataTypes.STRING(),
                    allowNull: false
                }

            },
            {
                sequelize,
            }
        );

        return this;
    };

    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso'});
        this.belongsTo(models.Turma, { foreignKey: 'turma'});
        this.belongsTo(models.Disciplina, { foreignKey: 'disciplina'});
        this.belongsTo(models.Usuario, { foreignKey: 'usuario'});
    };
};

export default Prova;