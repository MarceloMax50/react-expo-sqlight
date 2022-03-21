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
    const [status, setStatus] = useState([]);

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
        await loadTypes();
        let listaDeAtividades = await loadData();
        setStatus(["Todos", "Pendente", "Concluído "]);
        console.log("Status: " + status);
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

    function visualizar(atividade) {
        Alert.alert(
            'Visualizar',
            `\n 
            Descrição: ${atividade.description} \n
            Local: ${atividade.local} \n
            Hora de Entrega: ${atividade.deliveryTime} \n
            Data de Entrega: ${atividade.deliveryDate} \n`
        );
    }

    async function loadTypes() {
        let contactList = [];
        var todos = { id: 'Todos', name: 'Todos' };
        contactList.push(todos);

        let contactListAll = await loadType();
        contactListAll.forEach(element => {
            contactList.push(element);
        });

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

    function filterType(itemValue) {
        console.log('Tipo: ' + itemValue)
        if (itemValue && itemValue != 'Todos') {
            setTipo(itemValue);
            setAtividades(atividadesData.filter(atividade => atividade.type == itemValue).map(x => x));
        }
        else {
            setAtividades(atividadesData);
        }

        setRefresh(true);
    }

    function filterStatus(itemValue) {
        console.log('Status: ' + itemValue)
        if (itemValue && itemValue != 'Todos') {
            setStatus(itemValue);
            setAtividades(atividadesData.filter(atividade => atividade.status == itemValue).map(x => x));
            console.log('Status1: ' + itemValue)
        }
        else {
            setAtividades(atividadesData);
            console.log('Status2: ' + itemValue)
        }
        console.log('Status3: ' + itemValue)
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
                        onValueChange={(itemValue, itemIndex) => filterType(itemValue)}>
                        {
                            tipos.map((tipo, index) => (
                                <Picker.Item label={tipo.name} value={tipo.id} key={tipo.id} />
                            ))}

                    </Picker>
                </View>

            </View>
            <View style={styles.areaCad}>
                <View style={styles.areaTypeHome}>
                    <Text style={styles.subCad}>Status</Text>
                    <Picker
                        selectedValue={status}
                        style={styles.areaEdit}
                        onValueChange={(itemValue, itemIndex) => filterStatus(itemValue)}>

                        <Picker.Item label="Todos" value="Todos" key="Todos" />
                        <Picker.Item label="Pendente" value="Pendente" key="Pendente" />
                        <Picker.Item label="Concluído" value="Concluído" key="Concluído" />

                    </Picker>
                </View>

            </View>

            <ScrollView style={styles.listHome}>
                {
                    atividades.map((atividade, index) => (
                        <View style={styles.cadActivity} key={index.toString()}>

                            <View style={styles.btnAction}>
                                <TouchableOpacity onPress={() => visualizar(atividade)}>
                                    <Ionicons name="eye" size={32} color="gray" />
                                </TouchableOpacity>
                            </View>

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