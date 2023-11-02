const sqlite3 = require('sqlite3').verbose()

class SqliteRepository {
    constructor() {
        this.db = new sqlite3.Database('../data/save.db', (err) => {
            if (err) {
                console.error('Dev : Erreur connexion database : ', err.message)
            } else {
                console.log('Dev : Connexion à la base de donnée ok !')
            }

        })
        this.createTables();
    }

    createTables() {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE IF NOT EXISTS suite (ID INTEGER PRIMARY KEY, mot TEXT)");
            this.db.run("CREATE TABLE IF NOT EXISTS day (ID INTEGER PRIMARY KEY, mot TEXT)");
        });
    }

    getAllWordDay() {
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

    close() {
        this.db.close();
    }
}

module.exports = SqliteRepository

// // Exemple d'utilisation
// const dbPath = 'ma_base_de_donnees.db';
// const repository = new SqliteRepository(dbPath);

// (async () => {
//     try {
//         await repository.insertIntoTable('suite', 'Mot1');
//         await repository.insertIntoTable('suite', 'Mot2');
//         await repository.insertIntoTable('day', 'MotA');
//         await repository.insertIntoTable('day', 'MotB');

//         const allSuite = await repository.getAllFromTable('suite');
//         const allDay = await repository.getAllFromTable('day');

//         console.log('Contenu de la table "suite":', allSuite);
//         console.log('Contenu de la table "day":', allDay);
//     } catch (error) {
//         console.error('Erreur :', error);
//     } finally {
//         repository.close();
//     }
// })();