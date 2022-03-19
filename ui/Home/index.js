import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView, Image
} from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import styles from '../styles';
import Atividade from '../../entities/Atividade'
import { useState, useEffect } from 'react';

export default function Home({ navigation }) {

    let atividade = new Atividade();
    const [atividades, setAtividades] = useState([]);

    setAtividades([
        atividade
    ]);

    return (
        <View style={styles.container}>

            <Text style={styles.container}>Inicial</Text>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('CadastroAtividade')}>
                <Text>Cadastro de atividades</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao}
                onPress={() => navigation.navigate('CadastroTipoAtividade')}>
                <Text>Cadastro de tipo de atividade</Text>
            </TouchableOpacity>
            <ScrollView style={styles.listaContatos}>
                {
                    atividades.map((atividade, index) => (
                        <View style={styles.contato} key={index.toString()}>

                            <View style={styles.dadosListaTelefone}>
                                <Text style={styles.listaNome}> {atividade.name}</Text>
                            </View>
                            <View style={styles.dadosEmail}>
                                <Text style={styles.listaTelefone} >{atividade.email} </Text>
                            </View>

                            <View style={styles.dadosBotoesAcao}>
                                <TouchableOpacity onPress={() => shallDeleteOne(atividade.code)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => editar(atividade.code)}>
                                    <AntDesign name="edit" size={32} color="black" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ))
                }

            </ScrollView>

        </View>

    );

}