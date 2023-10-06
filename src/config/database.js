const databaseConfig = {
    dialect: 'postgres',
    host: 'postgres://edas:ZfHoXMnWMZTbv6ne8Fa7b4rF4b39ulR8@dpg-ckg2i7uct0pc73a0q9f0-a/edas_ifrs_feliz',
    username: 'edas',
    password: 'ZfHoXMnWMZTbv6ne8Fa7b4rF4b39ulR8',
    database: 'edas_ifrs_feliz',
    logging: false,
    timezone: "-03:00",
    define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true,
    },
};

export default databaseConfig;