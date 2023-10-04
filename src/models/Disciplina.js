import { DataTypes, Model } from "sequelize";

class Disciplina extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },

                nome: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                ano: {
                    type: DataTypes.INTEGER,
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
        this.hasMany(models.Prova, { foreignKey: 'disciplina' });
    };
};

export default Disciplina;