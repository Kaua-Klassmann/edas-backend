import { DataTypes, Model } from "sequelize";

class Ativacao extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },

                usuario: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },

                codigo: {
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
};

export default Ativacao;