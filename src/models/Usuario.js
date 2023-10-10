import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";

class Usuario extends Model {
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

                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },

                senha: {
                    type: DataTypes.VIRTUAL(255),
                }, 

                senha_hash: {
                    type: DataTypes.STRING(255),
                }, 

                ano: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                               
            },
            {
                sequelize,
            }
        );

        this.addHook("beforeSave", async Usuario => {
            if(Usuario.senha) {
                Usuario.senha_hash = await bcrypt.hash(Usuario.senha, 8);
            };
        });

        return this;
    };

    async checkPassword(senha){
        return await bcrypt.compare(senha, this.senha_hash);
    }

    static associate(models) {
        this.belongsTo(models.Curso, { foreignKey: 'curso'});
        this.belongsTo(models.Turma, { foreignKey: 'turma'});
        this.hasMany(models.Prova, { foreignKey: 'usuario' });
    };

};

export default Usuario;