import { react } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import styles from '../styles';
import { createTable } from '../../dao/TipoAtividadeDAO';
import { loadData, save, deleteOne } from '../../service/CadastroTipoAtividadeService';
import { useState, useEffect } from 'react';
import TipoAtividade from '../../entities/TipoAtividade';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
export default function CadastroTipoAtividade({ navigation }) {
    const [name, setName] = useState();
    const [tipos, setTipos] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const [shouldCreateTable, setCreateTable] = useState(false);

    async function processEffect() {
        if (!shouldCreateTable) {
            console.log("Verificando necessidade de criar tabelas...");
            setCreateTable(true);
            await createTable();
        }
        if (refresh) {
            console.log("Recarregando dados...");
            await load();
        }
    }
    useEffect(
        () => {
            console.log('executando useffect');
            processEffect();
        }, [refresh]);

    async function create() {
        let tipoAtividade = new TipoAtividade();
        tipoAtividade.name = name;
        tipoAtividade.id = uuidv4();
        save(tipoAtividade);
        setRefresh(true);

    }
    async function load() {
        let contactList = await loadData();
        setTipos(contactList);
        setRefresh(true);
    }

    async function deletar(id) {
        await deleteOne(id)
        setRefresh(true);
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.listaTipos}>
                {
                    tipos.map((tipo, index) => (
                        <View style={styles.contato} key={index.toString()}>

                            <View style={styles.dadosListaTipos}>
                                <Text style={styles.listaNome}>{tipo.name}</Text>

                            </View>

                            <View style={styles.dadosBotoesAcao}>
                                <TouchableOpacity onPress={() => deletar(tipo.id)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                }

            </ScrollView>
            <View style={styles.areaCadastro}>

                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Nome</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setName(texto)}
                        value={name}
                    />

                </View>
            </View>

            <View style={styles.areaBotes}>
                <TouchableOpacity style={styles.botao}
                    onPress={() => create()}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('Home')}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

}