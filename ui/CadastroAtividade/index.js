import { Text, Picker, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from "react";
import styles from '../styles';
//id, description , type, deliveryDate, deliveryTime, status
export default function CadastroAtividade({ navigation }) {
    const [selectedValue, setSelectedValue] = useState("Pendente");
    return (
        <View style={styles.container}>


            <View style={styles.areaCadastro}>

                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Descrição</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        //onChangeText={(texto) => setCode(texto)}
                        value={null}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Tipo</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        // onChangeText={(texto) => setName(texto)}
                        value={null}
                    />

                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Data de entrega</Text>

                    <TextInput
                        style={styles.campoEdicao}
                        // onChangeText={(texto) => setEmail(texto)}
                        value={null}
                    />

                </View>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Hora de entrega</Text>
                    <TextInput
                        style={styles.campoEdicao}
                        //  onChangeText={(texto) => setPhone(texto)}
                        value={null}
                    />
                </View>
            </View>

            <View style={styles.areaCadastro}>
                <View style={styles.area}>
                    <Text style={styles.legendaCadastro}>Status</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Pendente" value="Pendente" />
                        <Picker.Item label="Concluído" value="Concluído" />
                    </Picker>

                </View>
            </View>
            <View style={styles.areaBotes}>
                <TouchableOpacity style={styles.botao}
                >
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