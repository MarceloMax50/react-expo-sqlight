import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles';

export default function Tela1({ navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.areaCadastro}>

                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Código</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setCode(texto)}
                        value={code}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Nome</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setName(texto)}
                        value={name}
                    />

                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>E-mail</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setEmail(texto)}
                        value={email}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Telefone</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setPhone(texto)}
                        value={phone}
                    />
                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Senha</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setPassword(texto)}
                        secureTextEntry={true}
                        value={password}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Confirmar</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        onChangeText={(texto) => setConfirmationPass(texto)}
                        secureTextEntry={true}
                        value={confirmationPass}
                    />
                </View>
            </View>

            <Text style={styles.titulo}>Tela 1</Text>
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('Home')}>
                <Text>Voltar</Text>
            </TouchableOpacity>

        </View>

    );

}