import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView
} from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import styles from '../styles';
import Atividade from '../../entities/Atividade'
import { useState, useEffect } from 'react';

export default function Home({ navigation }) {

    let atividade = new Atividade();
    const [atividades, setAtividades] = useState([]);

    return (
        <View style={styles.container}>

            <ScrollView style={styles.listaContatos}>
                {
                    <View style={styles.contato}>

                        <View style={styles.dadosListaTelefone}>
                            <Text style={styles.listaNome}>atividade.name</Text>
                        </View>
                        <View style={styles.dadosEmail}>
                            <Text style={styles.listaTelefone} >atividade.email</Text>
                        </View>

                        <View style={styles.dadosBotoesAcao}>
                            <TouchableOpacity >
                                <Ionicons name="md-remove-circle" size={32} color="red" />
                            </TouchableOpacity>

                        </View>
                    </View>

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