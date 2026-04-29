import sql from "mssql";

export const dbConfig: sql.config = {
    user: "paneEndaArvutiNimi",
    password: "",
    server: ""
    //p'rast saab juurde kirjutada
}

export const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => pool);