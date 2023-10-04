import { DataTypes, Model } from "sequelize";

class Curso extends Model {
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

            },
            {
                sequelize,
            }
        );

        return this;
    };

    static associate(models) {
        this.hasMany(models.Usuario, { foreignKey: 'curso' });
        this.hasMany(models.Prova, { foreignKey: 'curso' });
        this.hasMany(models.Disciplina, { foreignKey: 'curso' });
    };
};

export default Curso;