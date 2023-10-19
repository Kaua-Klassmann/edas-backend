import { DataTypes, Model } from "sequelize";

class Ativacao extends Model {
    static init(sequelize) {
        super.init(
            {
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