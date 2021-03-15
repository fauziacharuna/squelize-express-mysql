module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Root_1234!",
    DB: "sequelize",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}