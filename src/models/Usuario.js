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
                    type: DataTypes.STRING(),
                    allowNull: false,
                },

                email: {
                    type: DataTypes.STRING(),
                    allowNull: false,
                    unique: true,
                },

                senha: {
                    type: DataTypes.VIRTUAL(),
                }, 

                senha_hash: {
                    type: DataTypes.STRING(),
                }, 

                ano: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                            
                ativado: {
                    type: DataTypes.BOOLEAN,
                }
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