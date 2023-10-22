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
                    allowNull: false,
                },

                codigo: {
                    type: DataTypes.STRING,
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