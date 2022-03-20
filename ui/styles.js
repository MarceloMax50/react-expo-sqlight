import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  areaCadastro: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  area: {
    width: '45%',
  },
  campoEdicao: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  legendaCadastro: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  areaBotes: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  botao: {
    backgroundColor: '#66a5f2',
    borderRadius: 10,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaContatos: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    marginTop: 20,
  },
  contato: {
    backgroundColor: '#292929',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  listaNome: {
    width: '50%',
    fontSize: 18,
    paddingRight: 10,
    color: '#fff',
  },
  dadosListaTelefone: {
    width: '35%',
    flexDirection: 'row',
  },
  dadosEmail: {
    width: '50%',
    flexDirection: 'row',
  },
  dadosBotoesAcao: {
    width: '10%',
  },
  iconTelefone: {
    width: 20,
    height: 25,
    marginRight: 5,
  },
  listaTelefone: {
    color: "#FFF",
    fontSize: 18,
  },
  tituloAgenda: {
    fontSize: 25,
    color: '#FFF',
    backgroundColor: '#66a5f2',
    width: '100%',
    textAlign: 'center'
  },
  listaTipos: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
    marginTop: 20,
    marginBottom: '50%'
  },
  dadosListaTipos: {
    width: '70%',
    flexDirection: 'row',
  },
});

export default styles;