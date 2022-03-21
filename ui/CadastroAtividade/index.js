import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import styles from '../styles';
import Atividade from '../../entities/Atividade';
import { loadData, save, deleteOne } from '../../service/CadastroAtividadeService';
import { loadType } from '../../service/CadastroTipoAtividadeService';
import { createTable } from '../../dao/AtividadeDAO';
import { v4 as uuidv4 } from 'uuid';
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

            <View style={styles.areaCadastro}>

                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Descrição</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setDescricao(texto)}
                        value={descricao}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Tipo</Text>
                    <Picker
                        selectedValue={tipo}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}>
                        {
                            tipos.map((tipo, index) => (
                                <Picker.Item label={tipo.name} value={tipo.id} key={tipo.id} />
                            ))}

                    </Picker>
                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Data de entrega</Text>

                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setData(texto)}
                        value={dataEntrega}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Hora de entrega</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setHora(texto)}
                        value={horaEntrega}
                    />
                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Local</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setLocal(texto)}
                        value={local}
                    />
                    <Text style={styles.legendaCadastro}>Status</Text>
                    <Picker
                        selectedValue={status}
                        style={styles.campoEdicao}
                        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                        <Picker.Item label="Pendente" value="Pendente" />
                        <Picker.Item label="Concluído" value="Concluído" />
                    </Picker>

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