import { Database } from "sqlite3";

class QuestionDb {
    private _db: Database;
    constructor(db) {
        this._db = db;
    }

    async get(id: number) {
        const sql = `SELECT 
                        q.*, 
                        GROUP_CONCAT(qc.choice, ':') AS choices, 
                        GROUP_CONCAT(qc.sort_order, ':') AS sort_order 
                    FROM Questions q
                    INNER JOIN QuestionChoices qc on q.choice_group = qc.group_id
                    WHERE q.id = :id`;
        const params = {':id': id};
        const result = await this._db.all(sql, params);
        return result;
    }
}

export default QuestionDb;