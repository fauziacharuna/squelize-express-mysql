module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_name",
    dialect: "mysql/postgre",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}