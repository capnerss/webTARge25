import { poolPromise } from "../config/db.ts";
import sql from "mssql";

export const getItems = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("Select * from Items");
    return result.recordset;
};

export const addItem = async (name: string) => {
    const pool = await poolPromise;
    await pool.request()
        .input("name", sql.NVarChar, name)
        .query("insert into Items (name) values (@name)");
};

export const deleteItem = async (id: number) => {
    const pool = await poolPromise;
    await pool.request()
        .input("id", sql.Int, id)
        .query("delete from Items where id = @id");
}
export const modifyItem = async (id: number, name: string) => {
    const pool = await poolPromise;
    await pool.request()
        .input("id", sql.Int, id)
        .input("name", sql.NVarChar(), name)
        .query("update items set name = @name where id = @id");
}