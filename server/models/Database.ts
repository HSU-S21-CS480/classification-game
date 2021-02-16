import { ISqlite, IMigrate, open } from 'sqlite';
import sqlite3, { Statement } from 'sqlite3';
import QuestionDb from './QuestionDb';

class Database {

    private _db;
    public Questions: QuestionDb | null;

    constructor(connection_string: string) {
        this.Questions = null;
        this.init(connection_string);
    }

    private async init(connection_string: string){
        this._db = await open<sqlite3.Database, sqlite3.Statement>({
            filename: connection_string,
            driver: sqlite3.Database
          });

        this.Questions = new QuestionDb(this._db);
    }
}

export default Database;