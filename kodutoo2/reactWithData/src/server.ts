import express from 'express'
import sql from "mssql"
import cors from 'cors'
import router from './routes/items.ts'
import {dbConfig} from "./config/db.ts";


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/items', router)

sql.connect(dbConfig);
app.listen(5000 );