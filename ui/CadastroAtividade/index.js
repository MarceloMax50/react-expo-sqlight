import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function CadastroAtividade({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Cadastro de Atividades</Text>
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('Home')}>
                <Text>Voltar</Text>
            </TouchableOpacity>

        </View>

    );

}