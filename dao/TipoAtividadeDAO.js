import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbAtividades.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbTipoAtividade
        (
            id text not null primary key,
            name text not null       
        )`;

        let dbCx = getDbConnection();
        dbCx.transaction(
            (tx) => tx.executeSql(query, [],
                (tx, resultado) => resolve(true)
            )
            ,
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};

export function listAll() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbTipoAtividade';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            name: registros.rows.item(n).name,
                        }
                        retorno.push(obj);
                    }
                    console.log(retorno);
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function create(tipoAtividade) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbTipoAtividade (id, name) values (?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [tipoAtividade.id, tipoAtividade.name],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function deleteByName(name) {
    return new Promise((resolve, reject) => {
        let query = 'delete from tbTipoAtividade where name=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [name],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}

export function GetByName(name) {
    return new Promise((resolve, reject) => {
        let query = 'select * from tbTipoAtividade where name=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [name],
                (tx, registros) => {
                    if (registros.rows.length == 0) {
                        resolve(false);
                    } else {
                        let obj = {
                            id: registros.rows.item(0).id,
                            name: registros.rows.item(0).name
                        }
                        console.log(obj);
                        resolve(obj);
                    }
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


