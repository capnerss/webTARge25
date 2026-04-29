import sql from "mssql";

export const dbConfig: sql.config = {
    user: "sa",
    password: "YourStrong!Passw0rd",
    server: "localhost/SQLEXPRESS",
    database: "ReactData",
    port: 1433,
    options: {
        trustServerCertificate: true,
    }

}

export const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => pool);