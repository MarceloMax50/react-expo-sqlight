import {
    listAll,
    create,
    deleteById,
} from '../dao/TipoAtividadeDAO';
export async function save(atividade) {

    try {
        await create(atividade);
        console.log(`Atividade ${atividade.name} salva!`)
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
    } catch (e) {
        Alert.alert(e);
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