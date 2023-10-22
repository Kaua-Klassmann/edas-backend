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
                email: {
                    type: DataTypes.STRING,
                },

                codigo: {
                    type: DataTypes.STRING,
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