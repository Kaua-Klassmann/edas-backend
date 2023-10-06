const databaseConfig = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'edas',
    logging: false,
    timezone: "-03:00",
    define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
    },
};

export default databaseConfig;