import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
    Alert, ScrollView, Text, TouchableOpacity,
    View
} from 'react-native';
import { deleteOne, loadData, update } from '../../service/CadastroAtividadeService';
import styles from '../styles';

export default function Home({ navigation }) {
    const [atividades, setAtividades] = useState([]);
    const [refresh, setRefresh] = useState(true);

    async function processEffect() {
        if (refresh) {
            console.log("Carregando dados...");
            await load();
        }

    }
    useEffect(
        () => {
            console.log('executando useffect');
            processEffect();
        }, [refresh]);

    async function load() {
        let listaDeAtividades = await loadData();
        console.log(listaDeAtividades);
        setAtividades(listaDeAtividades);
        setRefresh(true);
    }

    async function updateStatus() {
        await update();
        setRefresh(true);
    }

    async function deletar(id) {
        await deleteOne(id)
        sleep(1);
        load();
    }

    function sleep(seconds) {
        var e = new Date().getTime() + (seconds * 1000);
        while (new Date().getTime() <= e) { }
    }
    function changeStatus(id) {
        console.log("Id para atualizar:" + id)
        if (Alert.alert('Deseja mudar o status da atividade para CONCLUÍDO?',
            [
                {
                    text: 'Sim, confirmo!',
                    onPress: () => {
                        updateStatus(id);
                    }
                },
                {
                    text: 'Não!',
                    style: 'cancel'
                }
            ]));
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.listHome}>
                {
                    atividades.map((atividade, index) => (
                        <View style={styles.cadActivity} key={index.toString()}>

                            <View style={styles.dataListTypes}>
                                <Text style={styles.listName}>{atividade.description}</Text>
                                <View style={styles.dataListTypes}>
                                    <Text style={styles.listStatus}>{atividade.status}</Text>
                                    <TouchableOpacity onPress={() => updateStatus(atividade.id)}>
                                        <AntDesign name="retweet" size={32} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.btnAction}>
                                <TouchableOpacity onPress={() => deletar(atividade.id)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>

            <View style={styles.areaBtnHome}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate('CadastroAtividade')}>
                    <Text>Atividades</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate('CadastroTipoAtividade')}>
                    <Text>Tipo de Atividade</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}