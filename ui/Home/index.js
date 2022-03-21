import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView
} from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import styles from '../styles';
import Atividade from '../../entities/Atividade'
import { useState, useEffect } from 'react';
import { loadData, deleteOne, update } from '../../service/CadastroAtividadeService';

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
        sleep(1);
        load();

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
        if (Alert.alert('ATUALIZAR STATUS', 'Deseja mudar o status da atividade para CONCLUÍDO?',
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

            <ScrollView style={styles.listaTipos}>
                {
                    atividades.map((atividade, index) => (
                        <View style={styles.cardAtividade} key={index.toString()}>

                            <View style={styles.dadosListaTipos}>
                                <Text style={styles.listaNome}>{atividade.description}</Text>
                                <View style={styles.dadosListaTipos}>
                                    <Text style={styles.listaNome}>{atividade.status}</Text>
                                    <TouchableOpacity onPress={() => changeStatus(atividade.id)}>
                                        <AntDesign name="retweet" size={32} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            <View style={styles.dadosBotoesAcao}>
                                <TouchableOpacity onPress={() => deletar(atividade.id)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                }

            </ScrollView>

            <View style={styles.areaBotes}>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('CadastroAtividade')}>
                    <Text>Cadastro de atividades</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('CadastroTipoAtividade')}>
                    <Text>Cadastro de tipo de atividade</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}