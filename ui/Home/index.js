import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { deleteOne, loadData, update } from '../../service/CadastroAtividadeService';
import { loadType } from '../../service/CadastroTipoAtividadeService';
import styles from '../styles';

export default function Home({ navigation }) {
    const [atividadesData, setAtividadesData] = useState([]);
    const [atividades, setAtividades] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [tipo, setTipo] = useState("");
    const [tipos, setTipos] = useState([]);

    async function processEffect() {
        if (refresh) {
            console.log("Carregando dados...");
            await load();
            await loadTypes();
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
        setAtividadesData(listaDeAtividades);
        setRefresh(true);
    }

    async function updateStatus(id) {
        await update(id);
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
        Alert.alert(
            'Alterando status',
            'Deseja mudar o status da atividade para CONCLUÍDO?',
            [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => updateStatus(id)
                }
            ]
        );
    }

    async function loadTypes() {
        let contactList = await loadType();
        if (contactList.length > 0) {
            setTipos(contactList);
        }
        else {
            setTipos(
                [{
                    "id": "empty",
                    "name": " "
                }]
            );
            Alert.alert("Aviso", "Nenhum tipo de atividade cadastrado!");
        }
    }

    function filter(itemValue) {
        console.log('Tipo: ' + itemValue)
        if (itemValue) {
            setTipo(itemValue);
            setAtividades(atividadesData.filter(atividade => atividade.type == itemValue).map(x => x));
        }
        else {
            setAtividades(atividadesData);
        }

        setRefresh(true);
    }

    return (
        <View style={styles.container}>

            <View style={styles.areaCad}>
                <View style={styles.areaTypeHome}>
                    <Text style={styles.subCad}>Tipo</Text>
                    <Picker
                        selectedValue={tipo}
                        style={styles.areaEdit}
                        onValueChange={(itemValue, itemIndex) => filter(itemValue)}>
                        {
                            tipos.map((tipo, index) => (
                                <Picker.Item label={tipo.name} value={tipo.id} key={tipo.id} />
                            ))}

                    </Picker>
                </View>
            </View>

            <ScrollView style={styles.listHome}>
                {
                    atividades.map((atividade, index) => (
                        <View style={styles.cadActivity} key={index.toString()}>

                            {/* <View style={styles.btnAction}>
                                <TouchableOpacity onPress={() => navigation.navigate('CadastroAtividade', {
                                    itemId: atividade.id,
                                })}>
                                    <Ionicons name="eye" size={32} color="gray" />
                                </TouchableOpacity>
                            </View> */}

                            <View style={styles.dataListTypes}>
                                <Text style={styles.listName}>{atividade.description}</Text>
                                <View style={styles.dataListTypes}>
                                    <Text style={styles.listStatus}>{atividade.status}</Text>
                                    <TouchableOpacity onPress={() => changeStatus(atividade.id)}>
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