import { StatusBar } from 'expo-status-bar';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './ui/Home/index';
import CadastroAtividade from './ui/CadastroAtividade/index';
import CadastroTipoAtividade from './ui/CadastroTipoAtividade/index';
import { useState, useEffect } from 'react';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import styles from './styles';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadastroAtividade,
    CadastroTipoAtividade,
  })
);
export default function App() {

  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmationPass, setConfirmationPass] = useState();
  const [contacts, setContacts] = useState([]);
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
      await loadData();
    }
  }

  useEffect(
    () => {
      console.log('executando useffect');
      processEffect();
    }, [refresh]);


  function clean() {
    setCode('');
    setName('');
    setPhone('');
    setPassword('');
    setConfirmationPass('');
    setEmail('');
  }
  function isValidEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    Alert.alert("Você digitou um endereço de e-mail inválido!")
    return (false)
  }
  function isValidPassword(pass, confirmation) {
    var uppercase = /[A-Z]/;
    var number = /[0-9]/;
    var countUppercase = 0;
    var countNumber = 0;

    for (var i = 0; i < pass.length; i++) {
      if (uppercase.test(pass[i])) {
        countUppercase++;
      }
      if (number.test(pass[i])) {
        countNumber++;
      }
    }

    if (pass === confirmation
      && countUppercase > 0
      && countNumber > 0
      && pass.length > 4) {
      return true;
    }
    Alert.alert("A senha informada não atinge a complexidade desejada!")
    return false;
  }

  async function save() {
    let contact = {
      code: code,
      name: name,
      email: email,
      phone: phone,
      password: password
    };

    try {
      if (isValidEmail(email) && isValidPassword(password, confirmationPass)) {
        await create(contact);

        Keyboard.dismiss();
        setRefresh(true);
        Alert.alert("Tá Safe!");
      }
    }
    catch (err) {
      Alert.alert(`Error alert: ${erro.toString()}`);
    }
  }

  async function loadData() {
    try {
      let contactList = await listAll();
      setContacts(contactList);
      setRefresh(false);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }
  async function deleteAllData() {
    try {
      await deleteAll();
      setRefresh(true);
      Alert.alert('Já era...');
    }
    catch (e) {
      Alert.alert(e);
    }
  }

  function shallDeleteAll() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: () => {
            deleteAllData();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }

  function shallDeleteOne(id) {
    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => deleteOne(id),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }
  async function deleteOne(id) {
    try {
      await deleteById(id);
      Alert.alert('Contato apagado com sucesso!!!');
      clean();
      Keyboard.dismiss();
      setRefresh(true);
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <Routes />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.tituloAgenda}>Contatos</Text>
      <Text /><Text />

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
            keyboardType='phone-pad'
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

      <View style={styles.areaBotes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => save()}
        >
          <Text style={styles.legendaCadastro}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao}
          onPress={() => loadData()}>
          <Text style={styles.legendaCadastro}>Carregar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => clean()}
        >
          <Text style={styles.legendaCadastro}>Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => shallDeleteAll()}>
          <Text style={styles.legendaCadastro}>Apagar tudo</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </View >
  );

}
