import mysql from 'mysql2/promise';
import { dbConfig } from '../config/index.js';


async function query(sql, params) {
    try {
        const conn = await mysql.createConnection(dbConfig);
        await conn.connect();

        const [result] = await conn.execute(sql, params);

        conn.destroy();
        return result;
    } catch (error) {
        throw error;
    }

}

export default query;