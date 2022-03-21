import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbAtividades.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbAtividade
        (
            id text not null primary key,
            description text not null,
            type text not null,
            localization text not null,
            deliveryDate text not null,
            deliveryTime text not null,
            status text not null,
            FOREIGN KEY (type) REFERENCES tbTipoAtividade(id)      
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
            let query = 'select * from tbAtividade';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            id: registros.rows.item(n).id,
                            description: registros.rows.item(n).description,
                            local: registros.rows.item(n).localization,
                            type: registros.rows.item(n).type,
                            deliveryDate: registros.rows.item(n).deliveryDate,
                            deliveryTime: registros.rows.item(n).deliveryTime,
                            status: registros.rows.item(n).status
                        }
                        retorno.push(obj);
                    }
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

export function create(atividade) {
    console.log(atividade);
    return new Promise((resolve, reject) => {
        let query = 'insert into tbAtividade (id, description, type, localization, deliveryDate, deliveryTime, status) values (?,?,?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query,
                [atividade.id,
                atividade.descricao,
                atividade.tipo,
                atividade.local,
                atividade.dataEntrega,
                atividade.horaEntrega,
                atividade.status],
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

export function deleteById(id) {
    console.log('Apagando contact ' + id);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbAtividade where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
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

export function GetById(id) {
    return new Promise((resolve, reject) => {
        let query = 'select * from tbAtividade where id=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [id],
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

export function updateStatus(id) {
    console.log('começando o método alteracontact com id ' + id);
    return new Promise((resolve, reject) => {
        let query = 'update tbAtividade SET status = ? where id = ?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, ["Concluido", id],
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
