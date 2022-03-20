import { Alert } from 'react-native';
import {
    listAll,
    create,
    deleteById,
    GetByName
} from '../dao/TipoAtividadeDAO';
export async function save(atividade) {

    try {
        if (atividadeExists(atividade.name)) {
            Alert.alert(`A Atividade com esse nome já existe`);
        }
        else {
            let at = await GetByName(atividade.name);
            console.log(`Atividade existe: ${at.toString()}`);
            await create(atividade);
            console.log(`Atividade ${atividade.name} salva!`);
        }
    }
    catch (err) {
        Alert.alert(`Error alert: ${erro.toString()}`);
    }
}

export async function loadData() {
    try {
        let atividadeList = await listAll();
        return atividadeList;

    } catch (e) {
        Alert.alert(e.toString());
    }
}

export async function deleteOne(id) {
    try {
        await deleteById(id);
        console.log(`Atividade ${atividade.name} deletada!`)
    } catch (e) {
        Alert.alert(JSON.stringify(e));
    }
}

export async function update(atividade) {

    try {
        await create(atividade);

    }
    catch (err) {
        Alert.alert(`Error alert: ${erro.toString()}`);
    }
}
async function atividadeExists(name) {
    let exists = await GetByName(name);
    console.log("avividade exists:" + exists);
    if (exists) {
        return true;
    }
    return false;
}