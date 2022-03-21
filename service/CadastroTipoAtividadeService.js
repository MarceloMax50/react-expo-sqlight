import { Alert } from 'react-native';
import {
    listAll,
    create,
    deleteByName,
    GetByName
} from '../dao/TipoAtividadeDAO';
export async function save(atividade) {

    try {
        console.log(atividade);
        // if (atividadeExists(atividade.name) != false) {
        //     Alert.alert(`A Atividade com esse nome já existe`);
        // }
        // else {
        await create(atividade);
        console.log(`Atividade ${atividade.name} salva!`);
        //}
    }
    catch (err) {
        Alert.alert("Erro", `Error alert: ${erro.toString()}`);
    }
}

export async function loadType() {
    try {
        let atividadeList = await listAll();
        return atividadeList;

    } catch (e) {
        Alert.alert("Erro", e.toString());
    }
}

export async function deleteOne(name) {
    try {
        await deleteByName(name);
        console.log(`Tipo de Atividade ${name} deletada!`)
    } catch (e) {
        console.log(e);
        console.log(JSON.stringify(e));
    }
}

export async function update(atividade) {

    try {
        await create(atividade);

    }
    catch (err) {
        Alert.alert("Erro", `Error alert: ${erro.toString()}`);
    }
}
async function atividadeExists(name) {
    let exists = await GetByName(name);
    console.log("avividade exists:" + exists);
    if (exists === false) {
        return false;
    }
    return true;
}