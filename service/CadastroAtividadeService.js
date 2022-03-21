import { Alert } from 'react-native';
import {
    listAll,
    create,
    deleteById,
    GetByName,
    updateStatus
} from '../dao/AtividadeDAO';
export async function save(atividade) {

    try {
        await create(atividade);
    }
    catch (err) {
        console.log(err);
        Alert.alert(`Error alert: ${err.toString()}`);
    }
}

export async function loadData() {
    try {
        let atividadeList = await listAll();
        return atividadeList;

    } catch (err) {
        Alert.alert(`Error alert: ${err.toString()}`);
    }
}

export async function deleteOne(id) {
    try {
        await deleteById(id);
    } catch (err) {
        Alert.alert(`Error alert: ${err.toString()}`);
    }
}

export async function update(id) {

    try {
        await updateStatus(id);
    }
    catch (err) {
        Alert.alert(`Error alert: ${err.toString()}`);
    }
}