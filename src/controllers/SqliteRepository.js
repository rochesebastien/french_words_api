const sqlite3 = require('sqlite3').verbose()

class SqliteRepository {
    db

    constructor(databasePath) {
        this.db = new sqlite3.Database(databasePath, (err) => {
            if (err) {
                console.error('Dev : Erreur connexion database : ', err.message)
                return err
            } else {
                console.log('Dev : Connexion à la base de donnée ok !')
                return true
            }

        })
    }

    createTables() {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS suite (ID INTEGER PRIMARY KEY, mot TEXT)");
            this.db.run("CREATE TABLE IF NOT EXISTS day (ID INTEGER PRIMARY KEY, mot TEXT)");
        });
    }

    getWordDay() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM day`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    insertWordDay(mot) {
        console.log(mot);
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`INSERT INTO day (mot) VALUES (?)`);
            stmt.run(mot, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
                stmt.finalize();
            });
        });
    }

    getSuiteDay() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM suite`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    stmtSuiteDay(word_suite) {
        return new Promise((resolve, reject) => {
            const stmt = this.db.prepare(`INSERT INTO suite (mot) VALUES (?)`);
            stmt.run(word_suite, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
                stmt.finalize();
            });
        });
    }

    insertSuiteDay(suite){
        return new Promise((resolve, reject) => {
            suite.forEach(word => {
                this.stmtSuiteDay(word);
            });
            resolve(suite);
        });
    
    }

    clearTable(table) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM ${table}`, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(`Toutes les données de la table ${table} ont été supprimées.`);
                }
            });
        });
    }

    close() {
        this.db.close();
    }
}

module.exports = SqliteRepository