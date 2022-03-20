import { react } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles';

export default function CadastroTipoAtividade({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.areaCadastro}>

                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Código</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        //onChangeText={(texto) => setCode(texto)}
                        value={null}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Nome</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        // onChangeText={(texto) => setName(texto)}
                        value={null}
                    />

                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>E-mail</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        // onChangeText={(texto) => setEmail(texto)}
                        value={null}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Telefone</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        //  onChangeText={(texto) => setPhone(texto)}
                        value={null}
                    />
                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Senha</Text>
                    <TextInput
                        style={styles.campoEdicao}
                    // onChangeText={(texto) => setPassword(texto)}
                    //secureTextEntry={true}
                    // value={null}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Confirmar</Text>
                    <TextInput
                        style={styles.campoEdicao}
                    // onChangeText={(texto) => setConfirmationPass(texto)}
                    // secureTextEntry={true}
                    // value={null}
                    />
                </View>
            </View>

            <View style={styles.areaBotes}>
                <TouchableOpacity style={styles.botao}
                    onPress={() => navigation.navigate('Home')}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

}