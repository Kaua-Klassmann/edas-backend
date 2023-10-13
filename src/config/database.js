const databaseConfig = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: process.env.DB_LOGGING,
    timezone: process.env.DB_TIMEZONE,
    define: {
        timestamps: process.env.DB_TIMESTAMPS,
        underscored: process.env.DB_UNDERSCORED,
        freezeTableName: process.env.DB_FREEZETABLENAME,
    },
};

export default databaseConfig;