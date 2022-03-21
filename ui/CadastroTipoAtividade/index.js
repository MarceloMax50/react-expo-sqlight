import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { createTable } from '../../dao/TipoAtividadeDAO';
import TipoAtividade from '../../entities/TipoAtividade';
import { deleteOne, loadType, save } from '../../service/CadastroTipoAtividadeService';
import styles from '../styles';
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
        sleep(1);
        load();

    }
    async function load() {
        let listaDeTipos = await loadType();
        setTipos(listaDeTipos);
        setRefresh(true);
    }

    async function deletar(name) {
        await deleteOne(name)
        sleep(1);
        load();
    }

    function sleep(seconds) {
        var e = new Date().getTime() + (seconds * 1000);
        while (new Date().getTime() <= e) { }
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.listTypes}>
                {
                    tipos.map((tipo, index) => (
                        <View style={styles.contact} key={index.toString()}>

                            <View style={styles.dataListTypes}>
                                <Text style={styles.listName}>{tipo.name}</Text>

                            </View>

                            <View style={styles.btnAction}>
                                <TouchableOpacity onPress={() => deletar(tipo.name)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                }

            </ScrollView>

            <View style={styles.areaCadType}>
                <View style={styles.area}>
                    <Text style={styles.subCad}>Nome</Text>
                    <TextInput
                        style={styles.areaEdit}
                        onChangeText={(texto) => setName(texto)}
                        value={name}
                    />
                </View>
            </View>

            <View style={styles.areaBtnType}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => create()}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate('Home')}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

}