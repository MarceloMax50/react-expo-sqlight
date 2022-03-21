import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { createTable } from '../../dao/AtividadeDAO';
import Atividade from '../../entities/Atividade';
import { save } from '../../service/CadastroAtividadeService';
import { loadType } from '../../service/CadastroTipoAtividadeService';
import styles from '../styles';
export default function CadastroAtividade({ navigation }) {
    const [descricao, setDescricao] = useState();
    const [tipo, setTipo] = useState();
    const [local, setLocal] = useState();
    const [dataEntrega, setData] = useState();
    const [horaEntrega, setHora] = useState();
    const [status, setStatus] = useState("Pendente");
    const [tipos, setTipos] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const [shouldCreateTable, setCreateTable] = useState(false);

    async function processEffect() {
        if (!shouldCreateTable) {
            console.log("Verificando necessidade de criar tabelas...");
            setCreateTable(true);
            await createTable();
        } if (refresh) {
            console.log("Recarregando dados...");
            await loadTypes();
        }

    }
    useEffect(
        () => {
            console.log('executando useffect');
            processEffect();
        }, [refresh]);

    async function create() {
        let atividade = new Atividade(
            uuidv4(),
            descricao,
            tipo,
            local,
            dataEntrega,
            horaEntrega,
            status);
        console.log(atividade);
        save(atividade);

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
            Alert.alert("Nenhum tipo de atividade cadastrado!");
        }
    }
    return (
        <View style={styles.container}>

            <View style={styles.areaCad}>

                <View style={styles.area}>
                    <Text style={styles.subCad}>Descrição</Text>
                    <TextInput
                        style={styles.areaEdit}
                        onChangeText={(texto) => setDescricao(texto)}
                        value={descricao}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.subCad}>Local</Text>
                    <TextInput
                        style={styles.areaEdit}
                        onChangeText={(texto) => setLocal(texto)}
                        value={local}
                    />
                </View>
            </View>

            <View style={styles.areaCad}>
                <View style={styles.area}>
                    <Text style={styles.subCad}>Data de entrega</Text>

                    <TextInput
                        style={styles.areaEdit}
                        onChangeText={(texto) => setData(texto)}
                        value={dataEntrega}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.subCad}>Hora de entrega</Text>
                    <TextInput
                        style={styles.areaEdit}
                        onChangeText={(texto) => setHora(texto)}
                        value={horaEntrega}
                    />
                </View>
            </View>

            <View style={styles.areaCad}>
                <View style={styles.area}>
                    <Text style={styles.subCad}>Tipo</Text>
                    <Picker
                        selectedValue={tipo}
                        style={styles.areaEdit}
                        onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                        {
                            tipos.map((tipo, index) => (
                                <Picker.Item label={tipo.name} value={tipo.id} key={tipo.id} />
                            ))}

                    </Picker>
                </View>
                <View style={styles.area}>
                    <Text style={styles.subCad}>Status</Text>
                    <Picker
                        selectedValue={status}
                        style={styles.areaEdit}
                        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                        <Picker.Item label="Pendente" value="Pendente" />
                        <Picker.Item label="Concluído" value="Concluído" />
                    </Picker>
                </View>

            </View>

            <View style={styles.areaBtnActivity}>
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