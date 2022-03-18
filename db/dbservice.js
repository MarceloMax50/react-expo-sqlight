import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbContatos.db');
    return cx;
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        const query = `CREATE TABLE IF NOT EXISTS tbContacts
        (
            code text not null primary key,
            name text not null,
            phone text not null,
            email text not null,
            password text not null          
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
            let query = 'select * from tbContacts';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            code: registros.rows.item(n).code,
                            name: registros.rows.item(n).name,
                            phone: registros.rows.item(n).phone,
                            email: registros.rows.item(n).email,
                            password: registros.rows.item(n).password
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

export function create(contact) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbContacts (code, name , phone, email, password) values (?,?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [contact.code, contact.name, contact.phone, contact.email, contact.password],
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

export function deleteById(code) {
    console.log('Apagando contato ' + code);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbContacts where code=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [code],
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


export function deleteAll() {
    console.log("Apagando todos os contatos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbContacts';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}
