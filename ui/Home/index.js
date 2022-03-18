import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, ScrollView, Image
} from 'react-native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import styles from '../styles';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Inicial</Text>

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
                    contacts.map((contact, index) => (
                        <View style={styles.contato} key={index.toString()}>

                            <View style={styles.dadosListaTelefone}>
                                <Text style={styles.listaNome}> {contact.name}</Text>
                            </View>
                            <View style={styles.dadosEmail}>
                                <Image source={iconMail} style={styles.iconTelefone} />
                                <Text style={styles.listaTelefone} >{contact.email} </Text>
                            </View>

                            <View style={styles.dadosBotoesAcao}>
                                <TouchableOpacity onPress={() => shallDeleteOne(contact.code)}>
                                    <Ionicons name="md-remove-circle" size={32} color="red" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => editar(contact.code)}>
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