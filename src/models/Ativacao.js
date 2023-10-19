import { DataTypes, Model } from "sequelize";

class Ativacao extends Model {
    static init(sequelize) {
        super.init(
            {
                usuario: {
                    type: DataTypes.STRING(255),
                },

                codigo: {
                    type: DataTypes.STRING(255),
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