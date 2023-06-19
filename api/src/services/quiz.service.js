import query from "./db.service.js";


async function insert({ question, optionA, optionB, optionC, optionD, answer }) {

    try {
        const sql = "INSERT INTO `quizzes` (`question` , `option_a` , `option_b` , `option_c` , `option_d` , `answer` ) VALUES (?,?,?,?,?,?);";

        const params = [question, optionA, optionB, optionC, optionD, answer]

        const res = await query(sql, params);
        return res.insertId;
    } catch (error) {
        throw error;
    }
}


async function findRandom() {
    try {
        const sql = "SELECT * FROM `quizzes` ORDER BY RAND() LIMIT 10;";

        const res = await query(sql);
        return res;
    } catch (error) {
        throw error;
    }

}

async function findById(id) {
    try {
        const sql = "SELECT * FROM `quizzes` WHERE `id` = ?;";
        const params = [id];

        const res = await query(sql, params);
        return res[0];
    } catch (error) {
        throw error;
    }

}

async function findByUnique(question) {
    try {
        const sql = "SELECT * FROM `quizzes` WHERE `question` = ?;";
        const params = [question];

        const res = await query(sql, params);
        return res[0];
    } catch (error) {
        throw error;
    }

}

export default {
    insert,
    findRandom,
    findById,
    findByUnique
};